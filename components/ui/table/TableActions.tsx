import { useDispatch } from "react-redux";
import AppTooltip from "../AppTooltip";
import AppCustomButton from "../button/AppCustomButton";
import { openModal } from "@/features/modal/modalSlice";
import { BiEditAlt } from "react-icons/bi";
import { RxTrash } from "react-icons/rx";
import TableCell from "./TableCell";

interface TableActionsProps {
  allowEdit?: boolean;
  allowDelete?: boolean;

  editModalType?: string;
  editPayload?: Record<string, unknown>;

  deleteModalType?: string;
  deletePayload?: Record<string, unknown>;
}

export default function TableActions({
  allowEdit = false,
  allowDelete = false,
  editModalType,
  editPayload,
  deleteModalType,
  deletePayload,
}: TableActionsProps) {
  const dispatch = useDispatch();

  if (!allowEdit && !allowDelete) return null;

  return (
    <TableCell className="border-right-1 border-l border-gray-200 dark:border-gray-900">
      <div className="flex items-center gap-1.5">
        {allowEdit && editModalType && (
          <AppTooltip title="Edit">
            <AppCustomButton
              variant="outline"
              className="p-1.5! transition-transform hover:scale-110"
              onClick={() =>
                dispatch(
                  openModal({
                    type: editModalType,
                    payload: editPayload,
                  })
                )
              }
            >
              <BiEditAlt className="text-base text-blue-900 dark:text-blue-400" />
            </AppCustomButton>
          </AppTooltip>
        )}

        {allowDelete && deleteModalType && (
          <AppTooltip title="Delete">
            <AppCustomButton
              variant="ghost"
              className="p-1.5! transition-transform hover:scale-110"
              onClick={() =>
                dispatch(
                  openModal({
                    type: deleteModalType,
                    payload: deletePayload,
                  })
                )
              }
            >
              <RxTrash className="text-base text-red-700" />
            </AppCustomButton>
          </AppTooltip>
        )}
      </div>
    </TableCell>
  );
}