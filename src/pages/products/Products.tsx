import React, { useEffect, useState } from "react";
import {
  Card,
  Col,
  Row,
  Spin,
  message,
  Modal,
  Form,
  Input,
  Button,
} from "antd";
import axios from "axios";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string;
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>(
          "http://localhost:3000/products"
        );
        const productsWithNumberPrice = response.data.map((product) => ({
          ...product,
          price: Number(product.price),
        }));
        setProducts(productsWithNumberPrice);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        message.error("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAdd = () => {
    setIsEditing(false);
    setEditingProduct(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (product: Product) => {
    setIsEditing(true);
    setEditingProduct(product);
    form.setFieldsValue(product);
    setIsModalVisible(true);
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: "Are you sure you want to delete this product?",
      content: "Once deleted, the product cannot be recovered.",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          await axios.delete(`http://localhost:3000/products/${id}`);
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== id)
          );
          message.success("Product deleted successfully");
        } catch (error) {
          console.error("Failed to delete product:", error);
          message.error("Failed to delete product.");
        }
      },
    });
  };

  const handleSubmit = async (values: Omit<Product, "id">) => {
    try {
      if (isEditing && editingProduct) {
        await axios.put(`http://localhost:3000/products/${editingProduct.id}`, {
          ...values,
          price: Number(values.price),
        });
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === editingProduct.id
              ? { ...product, ...values, price: Number(values.price) }
              : product
          )
        );
        message.success("Product updated successfully");
      } else {
        const response = await axios.post<Product>(
          "http://localhost:3000/products",
          {
            ...values,
            price: Number(values.price),
          }
        );
        setProducts((prevProducts) => [...prevProducts, response.data]);
        message.success("Product added successfully");
      }
      form.resetFields();
      setIsModalVisible(false);
    } catch (error) {
      console.error("Failed to save product:", error);
      message.error("Failed to save product.");
    }
  };

  if (loading) return <Spin size="large" />;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleAdd}
        style={{ marginBottom: 16 }}
      >
        Add New Product
      </Button>
      <Row gutter={16}>
        {products.map((product) => (
          <Col span={8} key={product.id} className="mb-4">
            <Card
              bordered={false}
              className="rounded-lg shadow-lg flex flex-col"
              cover={
                <img
                  alt={product.title}
                  src={product.images}
                  className="rounded-t-lg object-cover h-[200px] w-full"
                />
              }
            >
              <div className="flex flex-col h-full">
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold mb-2">
                    {product.title}
                  </h3>
                  <p className="text-gray-700 mb-2">{product.description}</p>
                </div>
                <p className="text-xl font-bold text-green-600 mb-0">
                  ${product.price.toFixed(2)}
                </p>
                <div className="flex justify-end mt-2">
                  <Button
                    type="text"
                    icon={<EditOutlined />}
                    onClick={() => handleEdit(product)}
                  />
                  <Button
                    type="text"
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(product.id)}
                    danger
                  />
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal
        title={isEditing ? "Edit Product" : "Add Product"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={isEditing && editingProduct ? editingProduct : {}}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[
              { required: true, message: "Please input the product title!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
                message: "Please input the product description!",
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[
              { required: true, message: "Please input the product price!" },
            ]}
          >
            <Input type="number" step="0.01" />
          </Form.Item>
          <Form.Item
            name="images"
            label="Image URL"
            rules={[{ required: true, message: "Please input the image URL!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {isEditing ? "Update" : "Add"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Products;
