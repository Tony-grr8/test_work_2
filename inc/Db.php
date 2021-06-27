<?php 
class Database { 
    
    private $host = "localhost";
    private $db_name = "test_work";
    private $username = "root";
    private $password = "";
    public $conn;

    public function createConnection() {
 
        $this->conn = null;
 
        try {
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
        } catch(PDOException $exception) {
            echo "Не удалось подключиться к бд: " . $exception->getMessage();
        }
 
        return $this->conn;
    }
}
?>