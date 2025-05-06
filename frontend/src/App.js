import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";

// Pages
import HomePage from "./pages/home/HomePage";
import BlogPage from "./pages/blog/BlogPage";
import UseCasesPage from "./pages/usecases/UseCasesPage";
import AboutPage from "./pages/about/AboutPage";
import ContactPage from "./pages/contact/ContactPage";
import PromptsPage from "./pages/prompts/PromptsPage";
import PromptDetail from "./pages/prompts/PromptDetail";
import SingleBlogPage from './pages/SingleBlogPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<SingleBlogPage />} />
          <Route path="/usecases" element={<UseCasesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/prompts" element={<PromptsPage />} />
          <Route path="/prompts/:id" element={<PromptDetail />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
