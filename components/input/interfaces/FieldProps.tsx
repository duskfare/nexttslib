export interface FieldProps {
  onChange: (fieldValue: any) => Promise<void>;
  value: any;
  errorText?: string;
}
