import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { LogOut } from "lucide-react";

interface LogoutConfirmDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onConfirm: () => void;
}

export default function LogoutConfirmDialog({
	open,
	onOpenChange,
	onConfirm,
}: LogoutConfirmDialogProps) {
	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent className="max-w-sm">
				<AlertDialogHeader className="items-center">
					<div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 mb-2">
						<LogOut className="h-6 w-6 text-destructive" />
					</div>
					<AlertDialogTitle className="text-center">
						Konfirmasi Logout
					</AlertDialogTitle>
					<AlertDialogDescription className="text-center">
						Apakah Anda yakin ingin keluar dari sistem?
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter className="sm:justify-center gap-2">
					<AlertDialogCancel>Batal</AlertDialogCancel>
					<AlertDialogAction
						onClick={onConfirm}
						className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
						Logout
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
