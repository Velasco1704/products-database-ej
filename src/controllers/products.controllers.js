import { pool } from "../db.js";

export const getProducts = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM products");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query("SELECT * FROM products WHERE id = ?", [
      id,
    ]);
    if (result.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createProducts = async (req, res) => {
  try {
    const { title, price, description, image } = req.body;
    const [result] = await pool.query(
      "INSERT INTO products(title, price, description, image) VALUES(?, ?, ?, ?)",
      [title, price, description, image]
    );
    res.json({
      id: result.insertId,
      title,
      price,
      description,
      image
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateProducts = async (req, res) => {
  try {
    const result = await pool.query("UPDATE products SET ? WHERE id = ?", [
      req.body,
      req.params.id,
    ]);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteProducts = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM products WHERE id = ?", [
      req.params.id,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
