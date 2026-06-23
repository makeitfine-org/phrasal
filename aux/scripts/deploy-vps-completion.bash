_deploy_vps() {
    local cur="${COMP_WORDS[COMP_CWORD]}"
    if [ "$COMP_CWORD" -eq 1 ]; then
        COMPREPLY=($(compgen -W "backend frontend all" -- "$cur"))
    fi
}

complete -F _deploy_vps deploy-vps.sh
complete -F _deploy_vps ./aux/scripts/deploy-vps.sh
