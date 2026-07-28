import React from 'react'
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { closeModal } from "@/features/modal/modalSlice";
import { ROLE_CREATE_MODAL, ROLE_DELETE_MODAL, ROLE_UPDATE_MODAL } from '@/features/rolepermission/rolePermissionConstant';
import RoleCreate from './RoleCreate';
import RoleUpdate from './RoleUpdate';
import RoleDelete from './RoleDelete';

export default function RoleModal() {
    const dispatch = useAppDispatch();

    const { isOpen, type, payload } = useAppSelector(
        (state) => state.modal
    );
    if (!isOpen) return null;
    switch(type) {
        case ROLE_CREATE_MODAL:
            return (
                <RoleCreate
                    onClose={()=>dispatch(closeModal())}
                />
            )
        case ROLE_UPDATE_MODAL:
            return (
                <RoleUpdate
                    roleId={payload.roleId}
                    onClose={() => dispatch(closeModal())}
                />
            )
        case ROLE_DELETE_MODAL:
            return (
                <RoleDelete
                    roleId={payload.roleId}
                    onClose={() => dispatch(closeModal())}
                />
            )
    }

    return (
        <div>RoleModal</div>
    )
}
