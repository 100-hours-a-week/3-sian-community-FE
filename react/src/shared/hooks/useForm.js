import { useRef, useState, useCallback } from "react";

export default function useForm({ defaultValues = {} } = {}) {
  const valuesRef = useRef({ ...defaultValues });
  const rulesRef = useRef({}); // 유효성 규칙
  const inputsRef = useRef({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  // 개별 검증
  const validateField = useCallback((name, value) => {
    const rules = rulesRef.current[name];
    if (!rules) return "";

    if (rules.required) {
      if (!value.trim()) return rules.required.message;
    }

    if (rules.validate) {
      const result = rules.validate(value);
      if (result !== true) return result;
    }

    if (rules.pattern) {
      if (!rules.pattern.value.test(value)) {
        return rules.pattern.message;
      }
    }

    return "";
  }, []);

  const updateIsValid = useCallback((nextErrors) => {
    const hasError = Object.values(nextErrors).some((msg) => msg);
    const hasEmpty = Object.values(valuesRef.current).some((v) => !v?.trim());
    setIsValid(!hasError && !hasEmpty);
  }, []);

  // 값 변경 및 검증
  const setValue = useCallback(
    (name, value, { shouldValidate = true } = {}) => {
      valuesRef.current[name] = value;

      if (shouldValidate) {
        const msg = validateField(name, value);
        setErrors((prev) => {
          const newErrors = { ...prev, [name]: msg };

          setTimeout(() => updateIsValid(newErrors), 0);

          return newErrors;
        });
      } else {
        setTimeout(() => updateIsValid(errors), 0);
      }
    },
    [validateField, updateIsValid, errors]
  );

  const register = useCallback(
    (name, rules = {}) => {
      rulesRef.current[name] = rules;

      const refCallback = (el) => {
        if (!el) return;
        inputsRef.current[name] = el;

        // 초기값 설정
        if (valuesRef.current[name]) {
          el.value = valuesRef.current[name];
        }
      };

      const onChange = (e) => {
        const value = e.target.value;
        setValue(name, value, { shouldValidate: true });
      };

      return {
        name,
        ref: refCallback,
        onChange,
        onBlur: (e) => {
          const value = e.target.value;
          const msg = validateField(name, value);
          setErrors((prev) => ({ ...prev, [name]: msg }));
        },
      };
    },
    [setValue, validateField]
  );

  // 폼 전체 검증
  const validateAll = useCallback(() => {
    const newErrors = {};

    for (const name in rulesRef.current) {
      const value =
        inputsRef.current[name]?.value ?? valuesRef.current[name] ?? "";
      const msg = validateField(name, value);
      if (msg) newErrors[name] = msg;
    }

    setErrors(newErrors);

    setTimeout(() => updateIsValid(newErrors), 0);
    return newErrors;
  }, [validateField, updateIsValid]);

  const handleSubmit = useCallback(
    (onValid, onInvalid) => {
      return async (e) => {
        e?.preventDefault();
        const errs = validateAll();

        if (Object.keys(errs).length === 0) {
          await onValid(valuesRef.current);
        } else {
          onInvalid && onInvalid(errs);
        }
      };
    },
    [validateAll]
  );

  return {
    register,
    handleSubmit,
    errors,
    isValid,
  };
}
