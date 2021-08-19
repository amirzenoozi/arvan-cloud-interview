export interface ActionbarProps {
  title: string;
  open: boolean;
  message: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAlertResponse: React.Dispatch<React.SetStateAction<boolean>>;
}
