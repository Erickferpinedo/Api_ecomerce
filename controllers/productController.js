import Product from "../models/product.js";
import User from "../models/product.js";

async function getAll(req, res) {
    try {
      const product = await Product.find({ deletedAt: null });
      return res.json(product);
    } catch (error) {
      console.log(error);
      return res.status(404).json("Productos no encontrados");
    }
  }

  async function getById(req, res) {
    try {
      const product = await Product.findById(req.params.id);
      return res.json(Product);
    } catch (error) {
      console.log(error);
      return res.status(404).json("Producto no encontrado");
    }
  }


  export async function create(req, res) {
    try {
      const { Name, description, price, stock } = req.body;
  
      const newProduct = await Product.create({
        Name,
         description,
          price,
           stock,
      });
  
      return res.status(201).json("Producto fue creado");
    } catch (error) {
      console.log(error);
      return res.status(500).json("Internal server error");
    }
  }


  export async function update(req, res) {
    const userToUpdate = await User.findById(req.params.id);
  
    if (userToUpdate !== null) {
      const { name, email, password, address, phone} = req.body;
  
      userToUpdate.name = name || userToUpdate.name;
      userToUpdate.email = email || userToUpdate.email;
      userToUpdate.password = password || userToUpdate.password;
      userToUpdate.address = address || userToUpdate.address;
      userToUpdate.phone = phone || userToUpdate.phone;
  
      await userToUpdate.save();
  
      return res.json("El usuario ha sifo actualizo");
    } else {
      return res.json("No existe usuario con el ID mencionado");
    }
  }
  
  export async function destroy(req, res) {
    const userDelete = await User.findById(req.params.id);
  
    userDelete.deletedAt = Date.now();
    userDelete.save();
  
    return res.json("El user se ha eliminado");
  }
  
 








