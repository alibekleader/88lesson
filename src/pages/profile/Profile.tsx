// profile.tsx
import React, { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import Layout from '../../components/layout';

const Profile: React.FC = () => {
  const [name, setName] = useState<string>('John Doe');
  const [email, setEmail] = useState<string>('john.doe@example.com');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Here you can add the logic to update the profile
    alert('Profile updated successfully!');
  };

  return (
    <Layout title="Profile">
      <Container>
        <Card>
          <Card.Header>Profile Information</Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </Layout>
  );
};

export default Profile;