import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

class TestApp(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.get("http://localhost:3000/")  # Cambia si tu app corre en otro puerto

    def tearDown(self):
        self.driver.quit()

    # 1. Login exitoso
    def test_login_success(self):
        driver = self.driver
        driver.find_element(By.ID, "username").send_keys("admin@residencia.com")
        driver.find_element(By.ID, "password").send_keys("admin123")
        driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
        time.sleep(2)
        self.assertIn("dashboard", driver.current_url)

    # 2. Login incorrecto (varios intentos)
    def test_login_failure(self):
        driver = self.driver
        driver.find_element(By.ID, "username").send_keys("usuario@falso.com")
        driver.find_element(By.ID, "password").send_keys("clave_incorrecta")
        driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
        time.sleep(2)
        error = driver.find_element(By.CLASS_NAME, "text-red-600").text
        self.assertIn("Credenciales incorrectas", error)

    # 3. Acceder a gestión de hogares y contar los hogares cargados
    def test_list_homes(self):
        driver = self.driver
        # login primero
        driver.find_element(By.ID, "username").send_keys("admin@residencia.com")
        driver.find_element(By.ID, "password").send_keys("admin123")
        driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
        time.sleep(2)

        driver.get("http://localhost:3000/homes")
        time.sleep(2)
        homes = driver.find_elements(By.CLASS_NAME, "hover\\:shadow-lg")  # cada Card de hogar
        self.assertGreater(len(homes), 0)

    # 4. Medir tiempo de carga del dashboard después del login
    def test_dashboard_load_time(self):
        driver = self.driver
        start_time = time.time()

        driver.find_element(By.ID, "username").send_keys("admin@residencia.com")
        driver.find_element(By.ID, "password").send_keys("admin123")
        driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()

        time.sleep(2)  # espera mínima para que cargue
        end_time = time.time()
        load_time = end_time - start_time

        # Comprobamos que cargue en menos de 5 segundos
        self.assertLess(load_time, 5, f"Dashboard tardó demasiado: {load_time:.2f} segundos")

    # 5. Ir a la página para agregar un nuevo hogar
    def test_add_home_redirect(self):
        driver = self.driver
        # login primero
        driver.find_element(By.ID, "username").send_keys("admin@residencia.com")
        driver.find_element(By.ID, "password").send_keys("admin123")
        driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
        time.sleep(2)

        driver.get("http://localhost:3000/homes")
        time.sleep(2)

        driver.find_element(By.LINK_TEXT, "Agregar Nuevo Hogar").click()
        time.sleep(2)
        self.assertIn("/homes/add", driver.current_url)

if __name__ == "__main__":
    unittest.main()
