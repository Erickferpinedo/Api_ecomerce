import Pedido from "../models/pedido.js";

// Obtener todos los pedidos
export const getAll = async (req, res) => {
  try {
    const pedidos = await Pedido.find({ deletedAt: null });
    return res.json(pedidos);
  } catch (error) {
    console.error("Error al recuperar los pedidos:", error);
    return res.status(500).json({ message: "Error al recuperar los pedidos" });
  }
};

// Obtener pedido por ID
export const getById = async (req, res) => {
  try {
    const pedido = await Pedido.findById(req.params.id);
    
    if (!pedido || pedido.deletedAt) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }

    return res.json(pedido);
  } catch (error) {
    console.error("Error al recuperar el pedido:", error);
    return res.status(500).json({ message: "Error al recuperar el pedido" });
  }
};

// Crear un nuevo pedido
export const create = async (req, res) => {
  try {
    const { pedidoID, fechapedido, userID, total, estado } = req.body;

    // Validar los campos requeridos
    if (!pedidoID || !fechapedido || !userID || !total || !estado) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    const newPedido = await Pedido.create({
      pedidoID,
      fechapedido,
      userID,
      total,
      estado,
    });

    console.log("Pedido creado exitosamente");
    return res.status(201).json({ message: "Pedido creado exitosamente", pedido: newPedido });
  } catch (error) {
    console.error("Error al crear el pedido:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Actualizar un pedido por ID
export const update = async (req, res) => {
  try {
    const pedidoToUpdate = await Pedido.findById(req.params.id);

    if (!pedidoToUpdate || pedidoToUpdate.deletedAt) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }

    const { pedidoID, fechapedido, userID, total, estado } = req.body;

    // Usar el operador spread para actualizar los campos
    Object.assign(pedidoToUpdate, {
      pedidoID: pedidoID || pedidoToUpdate.pedidoID,
      fechapedido: fechapedido || pedidoToUpdate.fechapedido,
      userID: userID || pedidoToUpdate.userID,
      total: total || pedidoToUpdate.total,
      estado: estado || pedidoToUpdate.estado,
    });

    await pedidoToUpdate.save();

    return res.json({ message: "Pedido actualizado exitosamente", pedido: pedidoToUpdate });
  } catch (error) {
    console.error("Error al actualizar el pedido:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Eliminación suave de un pedido
export const softDelete = async (req, res) => {
  try {
    const pedidoToDelete = await Pedido.findById(req.params.id);

    if (!pedidoToDelete || pedidoToDelete.deletedAt) {
      return res.status(404).json({ message: "Pedido no encontrado o ya eliminado" });
    }

    pedidoToDelete.deletedAt = Date.now();
    await pedidoToDelete.save();

    return res.json({ message: "Pedido eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar el pedido:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
