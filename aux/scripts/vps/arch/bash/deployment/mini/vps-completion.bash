# Run:
# $> source aux/scripts/vps/arch/bash/deployment/mini/vps-completion.bash
_redeploy_vps() {
    local cur="${COMP_WORDS[COMP_CWORD]}"
    if [ "$COMP_CWORD" -eq 1 ]; then
        COMPREPLY=($(compgen -W "backend frontend all" -- "$cur"))
    fi
}

_undeploy_vps() {
    local cur="${COMP_WORDS[COMP_CWORD]}"
    if [ "$COMP_CWORD" -eq 1 ]; then
        COMPREPLY=($(compgen -W "backend frontend postgres all" -- "$cur"))
    fi
}

complete -F _redeploy_vps redeploy-vps.sh
complete -F _redeploy_vps ./aux/scripts/vps/arch/bash/deployment/mini/redeploy-vps.sh

complete -F _undeploy_vps undeploy-vps.sh
complete -F _undeploy_vps ./aux/scripts/vps/arch/bash/deployment/mini/special/3.undeploy-vps.sh

complete -F _undeploy_vps deploy-first-or-after-undeploy-vps.sh
complete -F _undeploy_vps ./aux/scripts/vps/arch/bash/deployment/mini/special/2.deploy-first-or-after-undeploy-vps.sh
