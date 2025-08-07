const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// GET /questions – все вопросы (с пользователем)
router.get('/', async (req, res) => {
  const questions = await Question.findAll({ include: 'User' });
  res.json(questions);
});

// GET /questions/:id – один вопрос
router.get('/:id', async (req, res) => {
  const question = await Question.findByPk(req.params.id, { include: 'User' });
  res.json(question);
});

// POST /questions – задать вопрос
router.post('/', async (req, res) => {
  const question = await Question.create(req.body);
  res.json(question);
});

// PUT /questions/:id – ответить на вопрос (или изменить текст)
router.put('/:id', async (req, res) => {
  const { answer_text } = req.body;
  await Question.update(
    { 
      answer_text,
      answered_at: answer_text ? new Date() : null // Если пришел ответ, ставим дату
    },
    { where: { id: req.params.id } }
  );
  res.json({ success: true });
});

// DELETE /questions/:id – удалить вопрос
router.delete('/:id', async (req, res) => {
  await Question.destroy({ where: { id: req.params.id } });
  res.json({ success: true });
});

module.exports = router;