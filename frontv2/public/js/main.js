document.querySelectorAll("form").forEach((form) => {
  const typeSelect = form.querySelector(".report-type");
  const subjectSelect = form.querySelector(".report-subject");
  if (!typeSelect || !subjectSelect) {
    return;
  }

  const applySubjectFilter = () => {
    const currentType = typeSelect.value;
    const options = Array.from(subjectSelect.options);

    options.forEach((option, index) => {
      if (index === 0) {
        option.hidden = false;
        option.disabled = false;
        return;
      }
      const visible = option.dataset.type === currentType;
      option.hidden = !visible;
      option.disabled = !visible;
    });

    const hasValidSelection = Array.from(subjectSelect.options).some(
      (option) => option.value === subjectSelect.value && !option.disabled
    );

    if (!hasValidSelection) {
      subjectSelect.value = "";
    }
  };

  const defaultType = typeSelect.dataset.default;
  if (defaultType) {
    typeSelect.value = defaultType;
  }

  applySubjectFilter();

  const defaultSubject = subjectSelect.dataset.default;
  if (defaultSubject) {
    subjectSelect.value = defaultSubject;
  }

  applySubjectFilter();
  typeSelect.addEventListener("change", applySubjectFilter);
});
