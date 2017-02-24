CREATE DATABASE amazon_db;
USE amazon_db;
CREATE TABLE Products(
	item_id integer NOT NULL PRIMARY KEY,
    product_name varchar(100) NOT NULL,
    dept_name varchar(60) NOT NULL,
    price decimal(7,2) NOT NULL,
    stock_quantity int(6) 	
)

ALTER TABLE Products MODIFY COLUMN item_id INT(6) AUTO_INCREMENT NOT NULL;

INSERT INTO amazon_db.products(product_name,dept_name,price,stock_quantity) VALUES ('Lego Alarm Clock','Electronics',20.00,100);
INSERT INTO amazon_db.products(product_name,dept_name,price,stock_quantity) VALUES ('Corelle plates','Kitchen',40.00,50);
INSERT INTO amazon_db.products(product_name,dept_name,price,stock_quantity) VALUES ('Lasko heater','Electronics',45.00,20);
INSERT INTO amazon_db.products(product_name,dept_name,price,stock_quantity) VALUES ('Globe','Education',10.00,100);
INSERT INTO amazon_db.products(product_name,dept_name,price,stock_quantity) VALUES ('Panasonic cordless phone','Electronics',20.00,100);
INSERT INTO amazon_db.products(product_name,dept_name,price,stock_quantity) VALUES ('Yamaha 88 keys keyboard','Electronics',120.00,10);
INSERT INTO amazon_db.products(product_name,dept_name,price,stock_quantity) VALUES ('Round wall decoration art','Home Improvement',20.00,10);
INSERT INTO amazon_db.products(product_name,dept_name,price,stock_quantity) VALUES ('Carpet 8x10','Home Improvement',200.00,5);
INSERT INTO amazon_db.products(product_name,dept_name,price,stock_quantity) VALUES ('Fossil wallet grey','Accessories',50.00,4);
INSERT INTO amazon_db.products(product_name,dept_name,price,stock_quantity) VALUES ('Experiments with Truth - Gandhi','Books',20.00,100);
INSERT INTO amazon_db.products(product_name,dept_name,price,stock_quantity) VALUES ('The better angels of our nature - Steven Pinker','Books',20.00,100);