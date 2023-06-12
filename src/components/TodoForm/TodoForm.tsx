import { FormEvent, useState } from "react";
import Form from "react-bootstrap/Form";
import "./TodoForm.css";

export interface ITodoFormProps {
  onSubmit: (input: string) => void;
}

export default function TodoForm({ onSubmit }: ITodoFormProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const trimmed = input.trim();
    if (!trimmed) {
      return;
    }

    onSubmit(trimmed);
    setInput("");
  };

  return (
    <Form onSubmit={handleSubmit} className="d-flex align-items-center">
      <Form.Group controlId="todoTextInput" className="flex-grow-1">
        <Form.Control
          type="text"
          placeholder="What needs to be done?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="input-field border-0 py-3 ps-3"
        />
      </Form.Group>
    </Form>
  );
}
