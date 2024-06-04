#!/bin/bash

set -euo pipefail

################################################################################
#
# 🩺 CI checks for asserting package health.
#
# See tests/README.md for the expected invocation flow
# of these functions.
#
################################################################################


###############
# CONSTANTS
###############

# see the log4j2.xml override configmap for the current canary value we're injecting
wantValue="BigBang.overrides"
targetFile="/fortify/ssc/conf/log4j2.xml"
targetResource="statefulset/fortify-ssc-webapp"
targetNs="fortify"

kubectlTimeout=5s

kubectlErr="KUBECTL_ERROR"


# wait script timings
elapsedSecs=0
intervalSecs=5
timeoutSecs=600

# ANSI colors are fun
RED="\e[31m"
GREEN="\e[32m"
YELLOW="\e[33m"
BLUE="\e[34m"
MAGENTA="\e[35m"
CYAN="\e[36m"
ENDCOLOR="\e[0m"


##############
# FUNCTIONS
##############

ts() {
  date +"%H:%M:%S"
}

slog() {
  # structured logging output, with colors
  # timestamp | filename | log message string  var1=val1  var2=val2

  # Usage:
  # - first arg can be any string
  # - any additional args should be named variables that can be dereferenced for printing

  echo -ne "$(ts) | ${YELLOW}[wait.sh]${ENDCOLOR} | ${1}\t"

  shift

  for var in "${@}";
  do
    echo -ne "  ${MAGENTA}${var}${YELLOW}=${CYAN}${!var}${ENDCOLOR}"
  done

  printf "\n"
}

check_log4j_config() {
  # - check the file for the first line containing the string BigBang.
  # - print its first two tokens to the console, with a . in between.
  kubectl -n $targetNs \
    --request-timeout $kubectlTimeout \
    exec -t  "${targetResource}" \
    -c webapp -- \
      cat "${targetFile}" | grep BigBang | head -n1 | awk '{ print $1 "." $2 }' \
  || echo "${kubectlErr}"
}

check_available_replicas() {
  kubectl \
    --request-timeout $kubectlTimeout \
    get $targetResource \
    -n $targetNs \
    -o jsonpath='{.status.availableReplicas}' \
  || echo "${kubectlErr}"
}

wait_pod_alive() {
   slog "${YELLOW}waiting for the fortify pod to finish starting up...${ENDCOLOR}" targetResource
   while true; do
      availableReplicas=$(check_available_replicas)
      if [[ $availableReplicas != "0" && $availableReplicas != "${kubectlErr}" ]]; then
         slog "pod is alive and ready to be checked out." elapsedSecs availableReplicas
         break
      fi
      slog "${CYAN}⏲️ fortify replicas not yet available for inspection. Sleeping until next retry." targetResource availableReplicas elapsedSecs intervalSecs timeoutSecs
      sleep $intervalSecs
      elapsedSecs=$((elapsedSecs+intervalSecs))
      if [[ $elapsedSecs -ge $timeoutSecs ]]; then
         slog "${RED}🛑 FATAL. Maximum wait time exceeded." elapsedSecs timeoutSecs
         exit 1
      fi
   done
}

wait_project() {
   # drop down a line because some of the calling scripts don't end their lines...
   printf "\n"

   # wait for the pod to be ready before we try to talk to it
   wait_pod_alive

   while true; do
      slog "${GREEN}🔬 Checking for desired canary value..." wantValue targetFile intervalSecs elapsedSecs timeoutSecs

      ## check health of installed package
      configValueCheckResult=$(check_log4j_config)

      ## exit early if we get the desired value
      if [[ "${configValueCheckResult}" == "${wantValue}" ]]; then
         slog "${BLUE}✅  Success! Target file contained the expected canary value." targetFile wantValue
         break
      fi

      ## repeat until time expires
      slog "${CYAN}⏲️ Canary value not found. Sleeping until next retry." elapsedSecs intervalSecs timeoutSecs
      sleep $intervalSecs

      elapsedSecs=$((elapsedSecs+intervalSecs))
      if [[ $elapsedSecs -ge $timeoutSecs ]]; then
        slog "${RED}🛑 FATAL. Maximum wait time exceeded." elapsedSecs timeoutSecs
        exit 1
      fi
   done
}
