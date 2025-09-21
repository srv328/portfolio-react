import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Modal,
} from "react-bootstrap";
import { motion } from "framer-motion";
import {
  FaPhone,
  FaUser,
  FaTelegram,
  FaEnvelope,
  FaWhatsapp,
  FaCheck,
  FaChevronDown,
} from "react-icons/fa";
import "./css/ContactForm.css";

const ContactForm = ({ isDarkMode }) => {
  const [formData, setFormData] = useState({
    name: "",
    purpose: "website",
    contactMethod: "",
    contactValue: "",
    description: "",
    agreeToPrivacy: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [isPurposeDropdownOpen, setIsPurposeDropdownOpen] = useState(false);
  const purposeDropdownRef = useRef(null);

  // Закрытие dropdown при клике вне его
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (purposeDropdownRef.current && !purposeDropdownRef.current.contains(event.target)) {
        setIsPurposeDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const purposeOptions = [
    { value: "website", label: "Разработка сайта" },
    { value: "support", label: "Техническая поддержка" },
    { value: "project", label: "Проектная деятельность" },
    { value: "consultation", label: "Консультация" },
    { value: "other", label: "Другое" },
  ];

  const contactMethods = [
    { value: "phone", label: "Телефон", icon: FaPhone },
    { value: "whatsapp", label: "WhatsApp", icon: FaWhatsapp },
    { value: "telegram", label: "Telegram", icon: FaTelegram },
    { value: "email", label: "Email", icon: FaEnvelope },
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Имя обязательно для заполнения";
    }

    if (!formData.purpose) {
      newErrors.purpose = "Выберите цель заявки";
    }

    if (!formData.contactMethod) {
      newErrors.contactMethod = "Выберите предпочтительный способ связи";
    }

    if (formData.contactMethod && !formData.contactValue.trim()) {
      newErrors.contactValue = "Укажите контактные данные";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Описание задачи обязательно для заполнения";
    }

    if (!formData.agreeToPrivacy) {
      newErrors.agreeToPrivacy =
        "Необходимо согласие с политикой конфиденциальности";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Очищаем ошибку при изменении поля
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleContactMethodChange = (method) => {
    setFormData((prev) => ({
      ...prev,
      contactMethod: method,
      contactValue: "",
    }));

    if (errors.contactMethod) {
      setErrors((prev) => ({
        ...prev,
        contactMethod: "",
      }));
    }
  };

  const handlePurposeSelect = (value) => {
    setFormData((prev) => ({
      ...prev,
      purpose: value,
    }));
    setIsPurposeDropdownOpen(false);

    if (errors.purpose) {
      setErrors((prev) => ({
        ...prev,
        purpose: "",
      }));
    }
  };

  const togglePurposeDropdown = () => {
    setIsPurposeDropdownOpen(!isPurposeDropdownOpen);
  };

  const getContactPlaceholder = (method) => {
    switch (method) {
      case "phone":
        return "Введите номер телефона";
      case "whatsapp":
        return "Введите номер WhatsApp";
      case "telegram":
        return "Введите @username или номер телефона";
      case "email":
        return "Введите email адрес";
      default:
        return "Введите контактные данные";
    }
  };

  // Компонент кастомного select
  const CustomSelect = ({ options, value, onChange, placeholder, error, isDarkMode }) => {
    const selectedOption = options.find(option => option.value === value);
    
    return (
      <div className="custom-select-container" ref={purposeDropdownRef}>
        <div 
          className={`custom-select ${error ? "error" : ""} ${isDarkMode ? "dark-mode" : "light-mode"}`}
          onClick={togglePurposeDropdown}
        >
          <span className={`custom-select-value ${!selectedOption ? "placeholder" : ""}`}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <FaChevronDown className={`custom-select-arrow ${isPurposeDropdownOpen ? "open" : ""}`} />
        </div>
        
        {isPurposeDropdownOpen && (
          <motion.div 
            className={`custom-select-dropdown ${isDarkMode ? "dark-mode" : "light-mode"}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {options.map((option) => (
              <div
                key={option.value}
                className={`custom-select-option ${value === option.value ? "selected" : ""}`}
                onClick={() => handlePurposeSelect(option.value)}
              >
                {option.label}
              </div>
            ))}
          </motion.div>
        )}
      </div>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Добавляем время отправки с клиента
      const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const formDataWithTimestamp = {
        ...formData,
        timestamp: new Date().toLocaleString('ru-RU', {
          timeZone: userTimeZone,
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }),
        timeZone: userTimeZone
      };

      const response = await fetch('/api/send-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataWithTimestamp),
      });

      const result = await response.json();

      if (result.success) {
        setShowSuccess(true);
        setFormData({
          name: "",
          purpose: "website",
          contactMethod: "",
          contactValue: "",
          description: "",
          agreeToPrivacy: false,
        });
      } else {
        // Показываем ошибки валидации
        if (result.errors) {
          const newErrors = {};
          result.errors.forEach(error => {
            // Простое сопоставление ошибок с полями
            if (error.includes('Имя')) newErrors.name = error;
            else if (error.includes('цель')) newErrors.purpose = error;
            else if (error.includes('способ связи')) newErrors.contactMethod = error;
            else if (error.includes('Контактные данные')) newErrors.contactValue = error;
            else if (error.includes('Описание')) newErrors.description = error;
            else if (error.includes('согласие')) newErrors.agreeToPrivacy = error;
          });
          setErrors(newErrors);
        } else {
          alert(result.message || 'Произошла ошибка при отправке заявки');
        }
      }
    } catch (error) {
      console.error("Ошибка отправки формы:", error);
      alert('Произошла ошибка при отправке заявки. Проверьте подключение к интернету.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const animationVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const formAnimationVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, delay: 0.2 },
    },
  };

  return (
    <section
      id="contact-form"
      className={`contact-form-section ${
        isDarkMode ? "dark-mode" : "light-mode"
      }`}
    >
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={animationVariants}
          className="text-center mb-5"
        >
          <h2 className="contact-form-title">Оставить заявку</h2>
          <p className="contact-form-subtitle">
            Расскажите о вашем проекте, и я свяжусь с вами в ближайшее время
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={formAnimationVariants}
        >
          <Row className="justify-content-center">
            <Col lg={8} md={10}>
              <div
                className={`contact-form-container ${
                  isDarkMode ? "dark-mode" : "light-mode"
                }`}
              >
                <Form onSubmit={handleSubmit} className="contact-form">
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="form-label">
                          <FaUser className="form-icon" />
                          Имя *
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Введите ваше имя"
                          className={`form-control-custom ${
                            errors.name ? "is-invalid" : ""
                          }`}
                          isInvalid={!!errors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.name}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="form-label">
                          Цель заявки *
                        </Form.Label>
                        <CustomSelect
                          options={purposeOptions}
                          value={formData.purpose}
                          onChange={handlePurposeSelect}
                          placeholder="Выберите цель"
                          error={!!errors.purpose}
                          isDarkMode={isDarkMode}
                        />
                        {errors.purpose && (
                          <div className="invalid-feedback d-block">
                            {errors.purpose}
                          </div>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label className="form-label">
                      Предпочтительный способ связи *
                    </Form.Label>
                    <div className="contact-methods">
                      {contactMethods.map((method) => {
                        const IconComponent = method.icon;
                        return (
                          <div
                            key={method.value}
                            className={`contact-method-option ${
                              formData.contactMethod === method.value
                                ? "selected"
                                : ""
                            } ${errors.contactMethod ? "error" : ""}`}
                            onClick={() =>
                              handleContactMethodChange(method.value)
                            }
                          >
                            <IconComponent className="contact-method-icon" />
                            <span>{method.label}</span>
                          </div>
                        );
                      })}
                    </div>
                    {errors.contactMethod && (
                      <div className="invalid-feedback d-block">
                        {errors.contactMethod}
                      </div>
                    )}
                  </Form.Group>

                  {formData.contactMethod && (
                    <Form.Group className="mb-3">
                      <Form.Label className="form-label">
                        Контактные данные *
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="contactValue"
                        value={formData.contactValue}
                        onChange={handleInputChange}
                        placeholder={getContactPlaceholder(
                          formData.contactMethod
                        )}
                        className={`form-control-custom ${
                          errors.contactValue ? "is-invalid" : ""
                        }`}
                        isInvalid={!!errors.contactValue}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.contactValue}
                      </Form.Control.Feedback>
                    </Form.Group>
                  )}

                  <Form.Group className="mb-4">
                    <Form.Label className="form-label">
                      Описание задачи *
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Опишите подробно вашу задачу, требования и пожелания..."
                      className={`form-control-custom ${
                        errors.description ? "is-invalid" : ""
                      }`}
                      isInvalid={!!errors.description}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.description}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Check
                      type="checkbox"
                      name="agreeToPrivacy"
                      checked={formData.agreeToPrivacy}
                      onChange={handleInputChange}
                      label={
                        <span>
                          Я соглашаюсь с{" "}
                          <button
                            type="button"
                            className="privacy-link"
                            onClick={() => setShowPrivacyModal(true)}
                          >
                            политикой конфиденциальности
                          </button>{" "}
                          и обработкой персональных данных *
                        </span>
                      }
                      className={`privacy-checkbox ${
                        errors.agreeToPrivacy ? "error" : ""
                      }`}
                      isInvalid={!!errors.agreeToPrivacy}
                    />
                    {errors.agreeToPrivacy && (
                      <div className="invalid-feedback d-block">
                        {errors.agreeToPrivacy}
                      </div>
                    )}
                  </Form.Group>

                  <div className="form-submit-container">
                    <Button
                      type="submit"
                      className="submit-button"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                          >
                            <span className="visually-hidden">Загрузка...</span>
                          </div>
                          Отправка...
                        </>
                      ) : (
                        <>
                          <FaCheck className="me-2" />
                          Отправить заявку
                        </>
                      )}
                    </Button>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </motion.div>
      </Container>

      {/* Модальное окно успешной отправки */}
      <Modal
        show={showSuccess}
        onHide={() => setShowSuccess(false)}
        centered
        className={`success-modal ${isDarkMode ? "dark-mode" : "light-mode"}`}
      >
        <Modal.Body className="text-center">
          <div className="success-icon">
            <FaCheck />
          </div>
          <h4 className="success-title">Заявка отправлена!</h4>
          <p className="success-message">
            Спасибо за вашу заявку. Я свяжусь с вами в ближайшее время.
          </p>
          <Button
            variant="primary"
            onClick={() => setShowSuccess(false)}
            className="success-button"
          >
            Понятно
          </Button>
        </Modal.Body>
      </Modal>

      {/* Модальное окно политики конфиденциальности */}
      <Modal
        show={showPrivacyModal}
        onHide={() => setShowPrivacyModal(false)}
        size="lg"
        className={`privacy-modal ${isDarkMode ? "dark-mode" : "light-mode"}`}
      >
        <Modal.Header closeButton>
          <Modal.Title>Политика конфиденциальности</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="privacy-content">
            <h5>1. Общие положения</h5>
            <p>
              Настоящая политика обработки персональных данных составлена в
              соответствии с требованиями Федерального закона от 27.07.2006.
              №152-ФЗ «О персональных данных» и определяет порядок обработки
              персональных данных и меры по обеспечению безопасности
              персональных данных.
            </p>

            <h5>2. Цели обработки персональных данных</h5>
            <p>Персональные данные обрабатываются в следующих целях:</p>
            <ul>
              <li>Обработка заявок и обращений пользователей</li>
              <li>Предоставление консультационных услуг</li>
              <li>Связь с пользователями по вопросам сотрудничества</li>
              <li>Информирование о новых услугах и проектах</li>
            </ul>

            <h5>3. Категории обрабатываемых персональных данных</h5>
            <p>Обрабатываются следующие категории персональных данных:</p>
            <ul>
              <li>Фамилия, имя, отчество</li>
              <li>Номер телефона</li>
              <li>Адрес электронной почты</li>
              <li>Никнейм в мессенджерах</li>
              <li>Иная информация, предоставленная пользователем</li>
            </ul>

            <h5>4. Способы обработки персональных данных</h5>
            <p>
              Обработка персональных данных осуществляется с использованием
              средств автоматизации и без использования таких средств, включая
              сбор, запись, систематизацию, накопление, хранение, уточнение,
              извлечение, использование, передачу, обезличивание, блокирование,
              удаление, уничтожение персональных данных.
            </p>

            <h5>5. Сроки обработки персональных данных</h5>
            <p>
              Персональные данные обрабатываются в течение срока, необходимого
              для достижения целей обработки, но не более 3 лет с момента
              последнего взаимодействия с пользователем.
            </p>

            <h5>6. Права субъекта персональных данных</h5>
            <p>Субъект персональных данных имеет право:</p>
            <ul>
              <li>Получать информацию об обработке его персональных данных</li>
              <li>Требовать уточнения персональных данных</li>
              <li>Требовать прекращения обработки персональных данных</li>
              <li>Отзывать согласие на обработку персональных данных</li>
            </ul>

            <h5>7. Контактная информация</h5>
            <p>
              По всем вопросам, связанным с обработкой персональных данных, вы
              можете обратиться по электронной почте: shevelev.rv328@gmail.com
            </p>

            <p className="privacy-date">
              <strong>Дата последнего обновления:</strong>{" "}
              {new Date().toLocaleDateString("ru-RU")}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowPrivacyModal(false)}
          >
            Закрыть
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setFormData((prev) => ({ ...prev, agreeToPrivacy: true }));
              setShowPrivacyModal(false);
            }}
          >
            Согласен
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
};

export default ContactForm;
