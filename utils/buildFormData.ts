
export function buildFormData(
  data: Record<string, any>,
  formData = new FormData(),
  parentKey = ""
): FormData {
  Object.entries(data).forEach(([key, value]) => {
    if (value === null || value === undefined || value === "") return;

    const formKey = parentKey ? `${parentKey}[${key}]` : key;

    if (value instanceof File) {
      formData.append(formKey, value);
    } else if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item === null || item === undefined) return;

        if (item instanceof File) {
          formData.append(`${formKey}[]`, item);
        } else if (typeof item === "object") {
          buildFormData(item, formData, `${formKey}[]`);
        } else {
          formData.append(`${formKey}[]`, String(item));
        }
      });
    } else if (value instanceof Date) {
      formData.append(formKey, value.toISOString());
    } else if (typeof value === "object") {
      buildFormData(value, formData, formKey);
    } else {
      formData.append(formKey, String(value));
    }
  });

  return formData;
}