_deploy_vps() {
    local cur="${COMP_WORDS[COMP_CWORD]}"
    if [ "$COMP_CWORD" -eq 1 ]; then
        COMPREPLY=($(compgen -W "backend frontend all" -- "$cur"))
    fi
}

complete -F _deploy_vps redeploy-vps.sh
complete -F _deploy_vps ./aux/scripts/vps/mini/redeploy-vps.sh
