const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

const { BOT_TOKEN, CHAT_ID } = require('./config.js');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend/build')));

async function sendTelegramMessage(formData) {
  try {
    const message = `
🎯 <b>Новая заявка с сайта портфолио</b>

👤 <b>Имя:</b> ${formData.name}
🎯 <b>Цель:</b> ${getPurposeLabel(formData.purpose)}
📞 <b>Способ связи:</b> ${getContactMethodLabel(formData.contactMethod)}
📱 <b>Контактные данные:</b> ${formData.contactValue}
${formData.telegram ? `📱 <b>Telegram:</b> @${formData.telegram.replace('@', '')}` : ''}

📝 <b>Описание задачи:</b>
${formData.description}

⏰ <b>Время заявки:</b> ${formData.timestamp || new Date().toLocaleString('ru-RU', {
      timeZone: 'Europe/Moscow',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })}${formData.timeZone ? ` (${formData.timeZone})` : ''}
    `;

    const response = await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: message,
      parse_mode: 'HTML',
      disable_web_page_preview: true
    });

    return { success: true, messageId: response.data.result.message_id };
  } catch (error) {
    console.error('Ошибка отправки в Telegram:', error.response?.data || error.message);
    throw new Error('Не удалось отправить заявку в Telegram');
  }
}

function getPurposeLabel(value) {
  const purposes = {
    'website': 'Разработка сайта',
    'support': 'Техническая поддержка',
    'project': 'Проектная деятельность',
    'consultation': 'Консультация',
    'other': 'Другое'
  };
  return purposes[value] || value;
}

function getContactMethodLabel(value) {
  const methods = {
    'phone': 'Телефон',
    'whatsapp': 'WhatsApp',
    'telegram': 'Telegram',
    'email': 'Email'
  };
  return methods[value] || value;
}

function validateFormData(data) {
  const errors = [];
  
  if (!data.name || data.name.trim().length < 2) {
    errors.push('Имя должно содержать минимум 2 символа');
  }
  
  if (!data.purpose) {
    errors.push('Не указана цель заявки');
  }
  
  if (!data.contactMethod) {
    errors.push('Не указан способ связи');
  }
  
  if (!data.contactValue || data.contactValue.trim().length < 3) {
    errors.push('Контактные данные должны содержать минимум 3 символа');
  }
  
  if (!data.description || data.description.trim().length < 10) {
    errors.push('Описание задачи должно содержать минимум 10 символов');
  }
  
  if (!data.agreeToPrivacy) {
    errors.push('Необходимо согласие с политикой конфиденциальности');
  }
  
  return errors;
}

app.post('/api/send-form', async (req, res) => {
  try {
    const formData = req.body;
    
    const validationErrors = validateFormData(formData);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        errors: validationErrors
      });
    }

    const telegramResult = await sendTelegramMessage(formData);
    
    if (telegramResult.success) {
      res.json({
        success: true,
        message: 'Заявка успешно отправлена!',
        messageId: telegramResult.messageId
      });
    } else {
      throw new Error('Ошибка отправки в Telegram');
    }
    
  } catch (error) {
    console.error('Ошибка обработки формы:', error);
    res.status(500).json({
      success: false,
      message: 'Произошла ошибка при отправке заявки. Попробуйте позже.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.use((error, req, res, next) => {
  console.error('Необработанная ошибка:', error);
  res.status(500).json({
    success: false,
    message: 'Внутренняя ошибка сервера'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Сервер запущен на порту ${PORT}`);
  console.log(`📱 Telegram Bot Token: ${BOT_TOKEN ? 'Настроен' : 'Не настроен'}`);
  console.log(`💬 Chat ID: ${CHAT_ID || 'Не настроен'}`);
});

module.exports = app;
