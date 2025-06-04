import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Linkedin } from "lucide-react";
import "./App.css"; // Assuming this is where we put the gradient CSS

export default function QuantPortfolio() {
  return (
    <div className="min-h-screen animated-gradient-bg text-white p-6 md:p-12">
      <header className="flex flex-col md:flex-row justify-between items-center border-b border-white/20 pb-6 mb-6">
        <h1 className="text-3xl font-bold">John Doe</h1>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <Github />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <Linkedin />
          </a>
        </div>
      </header>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">About Me</h2>
        <p>
          I’m a quantitative researcher and developer passionate about financial markets,
          machine learning, and statistics. I have experience building trading algorithms,
          analyzing market data, and applying advanced statistical models.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Projects</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardContent className="p-4">
              <h3 className="text-xl font-bold mb-2">Stat Arb Engine</h3>
              <p className="mb-2">
                Mean-reversion strategy using cointegration and Kalman filters. Backtested
                on intraday equity pairs.
              </p>
              <Button variant="outline" asChild>
                <a href="https://github.com">GitHub</a>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h3 className="text-xl font-bold mb-2">Options Pricing Dashboard</h3>
              <p className="mb-2">
                Visualizes Greeks and implied volatilities using Black-Scholes and Monte Carlo
                simulations.
              </p>
              <Button variant="outline" asChild>
                <a href="https://github.com">GitHub</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Resume</h2>
        <Button variant="default" asChild>
          <a href="/resume.pdf" download>
            Download Resume
          </a>
        </Button>
      </section>

      <footer className="pt-6 border-t border-white/20 text-center">
        <p>&copy; 2025 John Doe. Built with React & Tailwind CSS.</p>
      </footer>
    </div>
  );
}
