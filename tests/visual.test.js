// tests/visual.test.js
import { test, expect } from "@playwright/test";
import { Eyes, Target, ClassicRunner, Configuration, BatchInfo } from "@applitools/eyes-playwright";

test("📸 Verificación visual completa de la aplicación", async ({ page }) => {
  // 🔧 Configuración básica de Applitools
  const runner = new ClassicRunner();
  const eyes = new Eyes(runner);
  const configuration = new Configuration();
  configuration.setApiKey(process.env.APPLITOOLS_API_KEY);
  configuration.setBatch(new BatchInfo("Pruebas Visuales - Pagina Web"));
  eyes.setConfiguration(configuration);

  await eyes.open(page, "Pagina Web", "Prueba visual completa");

  // 🚀 Iniciar sesión
  await page.goto("http://localhost:3000/login");
  await page.fill("#username", "admin@residencia.com");
  await page.fill("#password", "admin123");
  await page.click("button[type='submit']");
  await page.waitForTimeout(2000);

  // 🖼️ Captura 1: Login
  await eyes.check("Login - Página inicial", Target.window());

  // 🖼️ Captura 2: Dashboard
  await page.goto("http://localhost:3000/dashboard");
  await page.waitForTimeout(2000);
  await eyes.check("Dashboard principal", Target.window());

  // 🖼️ Captura 3: Auxiliares
  await page.goto("http://localhost:3000/auxiliaries");
  await page.waitForTimeout(2000);
  await eyes.check("Módulo Auxiliares", Target.window());

  // 🖼️ Captura 4: Hogares
  await page.goto("http://localhost:3000/homes");
  await page.waitForTimeout(2000);
  await eyes.check("Módulo Hogares", Target.window());

  // 🖼️ Captura 5: Pacientes
  await page.goto("http://localhost:3000/patients");
  await page.waitForTimeout(2000);
  await eyes.check("Módulo Pacientes", Target.window());

  // ✅ Cerrar sesión visual
  await eyes.close();
});
