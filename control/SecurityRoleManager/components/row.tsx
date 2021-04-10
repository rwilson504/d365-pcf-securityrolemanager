import * as React from 'react'
import { SecurityRoleMap } from '../utilities'
import { SecurityRoleService } from '../services'
import { Checkbox, ICheckboxProps } from '@fluentui/react/lib/Checkbox'
import { Stack, IStackProps } from '@fluentui/react/lib/Stack'

export interface IRowProps {
    securityRoleMap: SecurityRoleMap
    securityRoleService: SecurityRoleService
    disabled: boolean
}

export function Row(props: IRowProps) {
    const { securityRoleService, disabled } = props
    const [securityRoleMap, setSecurityRoleMap] = React.useState(props.securityRoleMap)

    const stackProps: IStackProps = {
        horizontal: true,
    }

    const checkboxProps: ICheckboxProps = {
        label: securityRoleMap.name,
        checked: securityRoleMap.isAssigned,
        onChange: async (ev?: React.FormEvent, checked?: boolean) => {
            if (typeof checked === 'undefined') return

            try {
                if (checked) {
                    await securityRoleService.associateSecurityRole(securityRoleMap.id)
                } else {
                    await securityRoleService.disassociateSecurityRoles(securityRoleMap.id)
                }
                setSecurityRoleMap({ ...securityRoleMap, isAssigned: !securityRoleMap.isAssigned })
            } finally {
            }
        }
    }

    return (
        <Stack {...stackProps}>
            <Checkbox {...checkboxProps} disabled={disabled} />
        </Stack>
    )
}
