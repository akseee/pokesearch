export interface SearchFormProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  inputPlaceholder?: string;
  buttonText?: string;
  className?: string;
}
