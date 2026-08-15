<FormInput
    name="name"
    label={t("label.")}
    placeholder={t("placeholder.")}
    required
/>

<FormInput
    name="email"
    label={t("label.")}
    type="email"
    placeholder={t("placeholder.")}
    required
/>

<FormInput
    name="phone"
    label={t("label.")}
    type="tel"
    placeholder={t("placeholder.")}
/>

<FormDatePicker
    name="date_of_birth"
    label={t("label.")}
    required
/>


<FormSelect
    name="gender"
    label={t("label.")}
    placeholder={t("placeholder.")}
    required
    options={Options ?? []}
/>

<FormTextArea
    name="address"
    label={t("label.")}
    placeholder={t("placeholder.")}
/>

<FormInput
    name="basic_salary"
    label={t("label.")}
    type="number"
    placeholder="0.00" 
/> 

<FormTimePicker
    name="shift_start"
    label={t("label.")}
    required
/>

<FormFileUpload
    name="documents"
    label={t("label.")}
    multiple
    required
    accept="application/pdf,image/*"
    existingFiles={oldData?.documents ?? []}
    onRemoveExistingFile={(url) =>
        setExistingDocs((prev) => prev.filter((u) => u !== url))
    }
/>
<FormFileUpload
    name="profile_img"
    required
    label={t("label.")}
    accept='image/*'
    existingFile={oldData?.profile_img ?? ''}
/>