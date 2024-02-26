export type FieldValidatorsType = (value: string) => string | undefined

export const requiredField: FieldValidatorsType = (value) => {
    return value ? undefined : 'Field is required'
}

export const maxLengthCreator = (maxLength: number): FieldValidatorsType => (value) => {
    return value.length > maxLength ? `Max length is ${maxLength} symbols` : undefined
}