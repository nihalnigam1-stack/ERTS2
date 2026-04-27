const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// Get dashboard data
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            expenses: user.dashboardData?.expenses || [],
            tasks: user.dashboardData?.tasks || []
        });
    } catch (error) {
        console.error('Get Dashboard Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Add expense
router.post('/expense', auth, async (req, res) => {
    try {
        const { name, amount, date } = req.body;
        const user = await User.findById(req.user.userId);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.dashboardData) {
            user.dashboardData = { expenses: [], tasks: [] };
        }
        if (!user.dashboardData.expenses) {
            user.dashboardData.expenses = [];
        }

        const expense = {
            id: Date.now().toString(),
            name,
            amount,
            date: date || new Date().toISOString()
        };

        user.dashboardData.expenses.push(expense);
        await user.save();

        res.json({ message: 'Expense added successfully', expenses: user.dashboardData.expenses });
    } catch (error) {
        console.error('Add Expense Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete expense
router.delete('/expense/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(req.user.userId);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.dashboardData.expenses = user.dashboardData.expenses.filter(e => e.id !== id);
        await user.save();

        res.json({ message: 'Expense deleted successfully', expenses: user.dashboardData.expenses });
    } catch (error) {
        console.error('Delete Expense Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Add task
router.post('/task', auth, async (req, res) => {
    try {
        const { text, date } = req.body;
        const user = await User.findById(req.user.userId);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.dashboardData) {
            user.dashboardData = { expenses: [], tasks: [] };
        }
        if (!user.dashboardData.tasks) {
            user.dashboardData.tasks = [];
        }

        const task = {
            id: Date.now().toString(),
            text,
            date: date || new Date().toISOString(),
            completed: false
        };

        user.dashboardData.tasks.push(task);
        await user.save();

        res.json({ message: 'Task added successfully', tasks: user.dashboardData.tasks });
    } catch (error) {
        console.error('Add Task Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Toggle task completion
router.put('/task/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(req.user.userId);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const task = user.dashboardData.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            await user.save();
        }

        res.json({ message: 'Task updated successfully', tasks: user.dashboardData.tasks });
    } catch (error) {
        console.error('Toggle Task Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete task
router.delete('/task/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(req.user.userId);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.dashboardData.tasks = user.dashboardData.tasks.filter(t => t.id !== id);
        await user.save();

        res.json({ message: 'Task deleted successfully', tasks: user.dashboardData.tasks });
    } catch (error) {
        console.error('Delete Task Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
