import { test, expect } from "@playwright/test";
import { Eyes, Target } from "@applitools/eyes-playwright";

test("Verificación visual de la página principal", async ({ page }) => {
  const eyes = new Eyes();

  await eyes.open(page, "Pagina Web", "Pantalla principal");

  // Abre tu app local (ajusta el puerto si no es 3000)
  await page.goto("http://localhost:3000/login");

  // Iniciar sesión automáticamente (opcional)
  await page.fill('input[id="username"]', "admin@residencia.com");
  await page.fill('input[id="password"]', "admin123");
  await page.click('button[type="submit"]');

  // Espera a que cargue el dashboard
  await page.waitForURL("**/dashboard");

  // Captura visual con IA de la pantalla del dashboard
  await eyes.check("Dashboard principal", Target.window());

  await eyes.close();
});
