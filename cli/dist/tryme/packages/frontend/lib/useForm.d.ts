export declare function useForm<T>(i: {
    handleSubmit: () => Promise<T>;
    fields?: Array<{
        setDisabled: (v: boolean) => void;
    }>;
    onSuccessText?: string;
    onSuccess?: () => void;
}): {
    onSubmit: (e: any) => Promise<void>;
    loading: any;
    result: any;
};
export declare function useFormField(initialValue: string): {
    value: any;
    onChange: any;
    disabled: any;
    setDisabled: any;
};
//# sourceMappingURL=useForm.d.ts.map