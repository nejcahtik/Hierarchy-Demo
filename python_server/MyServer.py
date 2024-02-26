import mysql.connector
from openpyxl import load_workbook

from Client import Client
from Contract import Contract
from ExecutedContract import ExecutedContract
from User import User
from Level import Level
from Product import Product
from http.server import BaseHTTPRequestHandler, HTTPServer
import json
from main import Main


class MyServer(BaseHTTPRequestHandler):

    main = Main()

    def do_GET(self):
        print(self.path)

        if self.path == "/Users":

            self.send_response(200)
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            # json_object = json.dumps(self.main.show_users())
            parse = json.dumps(self.main.show_users(), default=lambda o: o.encode(), indent=4)
            self.wfile.write(bytes(parse, 'UTF-8'))

        elif self.path.startswith("/ShowContracts"):
            dateFrom = self.path[18:28]
            dateTo = self.path[30:]
            print(dateFrom, dateTo)
            self.send_response(200)
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            parse = json.dumps(self.main.show_contracts(dateFrom, dateTo), default=lambda o: o.encode(), indent=4)
            self.wfile.write(bytes(parse, 'UTF-8'))

        elif self.path.startswith("/ShowExecutedContracts"):
            dateFrom = self.path[26:36]
            dateTo = self.path[38:]
            print(dateFrom, dateTo)
            self.send_response(200)
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            parse = json.dumps(self.main.show_executed_contracts(dateFrom, dateTo), default=lambda o: o.encode(),
                               indent=4)
            self.wfile.write(bytes(parse, 'UTF-8'))

        elif self.path == "/Clients":
            self.send_response(200)
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            parse = json.dumps(self.main.show_clients(), default=lambda o: o.encode(), indent=4)
            self.wfile.write(bytes(parse, 'UTF-8'))

        elif self.path == "/Products":
            self.send_response(200)
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            parse = json.dumps(self.main.show_products(), default=lambda o: o.encode(), indent=4)
            self.wfile.write(bytes(parse, 'UTF-8'))

        elif self.path == "/Levels":
            self.send_response(200)
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            parse = json.dumps(self.main.show_levels(), default=lambda o: o.encode(), indent=4)
            self.wfile.write(bytes(parse, 'UTF-8'))
        elif self.path.startswith("/UsersDelete"):
            user_id = self.path[13:]
            print(user_id)
            self.main.delete_user(user_id)
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.send_response(200)
        elif self.path.startswith("/LevelsDelete"):
            level_id = self.path[14:]
            self.main.delete_level(level_id)
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.send_response(200)
        elif self.path.startswith("/ClientsDelete"):
            client_id = self.path[15:]
            print(client_id)
            self.main.delete_client(client_id)
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.send_response(200)
        elif self.path.startswith("/ProductsDelete"):
            product_id = self.path[16:]
            self.main.delete_product(product_id)
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.send_response(200)
        else:
            path = self.path[0:5]

            if path == "/User":
                user_id = self.path[7:]
                self.send_response(200)
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                parse = json.dumps(self.main.get_user_from_id(user_id), default=lambda o: o.encode(), indent=4)
                self.wfile.write(bytes(parse, 'UTF-8'))
            elif path == "/Clie":
                client_id = self.path[9:]
                self.send_response(200)
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                parse = json.dumps(self.main.get_client_from_id(client_id), default=lambda o: o.encode(), indent=4)
                self.wfile.write(bytes(parse, 'UTF-8'))
            elif path == "/Prod":
                product_id = self.path[10:]
                self.send_response(200)
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                parse = json.dumps(self.main.get_client_from_id(product_id), default=lambda o: o.encode(), indent=4)
                self.wfile.write(bytes(parse, 'UTF-8'))
            elif path == "/Cont":
                contract_id = self.path[11:]
                self.send_response(200)
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                parse = json.dumps(self.main.get_contract_from_contract_id(contract_id), default=lambda o: o.encode(), indent=4)
                self.wfile.write(bytes(parse, 'UTF-8'))
            elif path == "Exec":
                ex_cont_id = self.path[18:]
                self.send_response(200)
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                parse = json.dumps(self.main.get_executed_contract_from_contract_id(ex_cont_id), default=lambda o: o.encode(),
                                   indent=4)
                self.wfile.write(bytes(parse, 'UTF-8'))
            elif path == "/Leve":
                self.send_response(200)
                level_id = self.path[8:]
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                parse = json.dumps(self.main.get_level_from_level_id(level_id), default=lambda o: o.encode(),
                                   indent=4)
                self.wfile.write(bytes(parse, 'UTF-8'))

    def do_POST(self):
        print(self.path)
        if self.path == "/Users":

            content_len = int(self.headers.get('content-length', 0))
            body = self.rfile.read(content_len)
            user_data = json.loads(body)
            self.send_response(200)
            mentor = self.main.get_user_from_id(user_data["mentor_id"])
            self.main.add_user(user_data["name"], user_data["surname"],
                            mentor, user_data["personal_points"],
                            user_data["networking_points"], user_data["paid_points"],
                            user_data["cash"], user_data["paid_cash"], user_data["emso"], user_data["municipality"],
                            user_data["geolocation"], user_data["trr"],
                            user_data["bank"], str(user_data["employment_contract_date"])[:10], str(user_data["date_of_mentorship"]))
        elif self.path == "/Users/ActualLevel":
            content_len = int(self.headers.get('content-length', 0))
            body = self.rfile.read(content_len)
            points_data = json.loads(body)
            self.send_response(200)
            level = json.dumps(self.main.get_actual_level(points_data["points"]), default=lambda o: o.encode(),
                                   indent=4)
            if level is not None:
                print(level)
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Content-Length', str(len(bytes(level, 'UTF-8'))))
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                print(bytes(level, 'UTF-8'))
                self.wfile.write(bytes(level, 'UTF-8'))

        elif self.path == "/Products":
            content_len = int(self.headers.get('content-length', 0))
            body = self.rfile.read(content_len)
            product_data = json.loads(body)
            self.send_response(200)

            self.main.add_product(product_data["productName"], product_data["productPartner"],
                               product_data["constant"], product_data["planValue"],
                               product_data["basicName"], product_data["planType"],
                               product_data["productType"], product_data["planName"],
                               product_data["bcv"], product_data["pointsEarned"],
                               product_data["pointsToBePaid"], product_data["pointsForCareer"],
                               product_data["satbppr"])
        elif self.path == "/Levels":
            content_len = int(self.headers.get('content-length', 0))
            body = self.rfile.read(content_len)
            level_data = json.loads(body)
            self.send_response(200)
            self.main.add_level(level_data["levelNumber"], level_data["levelName"],
                             level_data["pointsFrom"], level_data["pointsTo"],
                             level_data["inEUR"])
        elif self.path == "/Clients":
            content_len = int(self.headers.get('content-length', 0))
            body = self.rfile.read(content_len)
            client_data = json.loads(body)
            self.send_response(200)
            self.main.add_client(client_data["name"], client_data["surname"],
                              client_data["emso"], client_data["address"],
                              client_data["city"], client_data["email"])
        elif self.path == "/Contracts":
            content_len = int(self.headers.get('content-length', 0))
            body = self.rfile.read(content_len)
            contract_data = json.loads(body)
            parse = json.dumps(self.main.add_contract(contract_data["product_id"], contract_data["user_id"],
                                contract_data["client_id"], str(contract_data["date"])[:10],
                                float(contract_data["baseValue"])), default=lambda o: o.encode(),
                                   indent=4)
            print("parse: "+parse)
            print("bytes of parse"+str(bytes(parse, 'UTF-8')))
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Content-Length', str(len(bytes(parse, 'UTF-8'))))
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            print(bytes(parse, 'UTF-8'))
            self.wfile.write(bytes(parse, 'UTF-8'))
        elif self.path == "/ContractsPayOut":
            content_len = int(self.headers.get('content-length', 0))
            body = self.rfile.read(content_len)
            contract_data = json.loads(body)
            self.send_response(200)
            self.main.pay_out_contract(self.main.get_contract_from_contract_id(contract_data["contract_id"]))
        elif self.path == "/ExecutedContractsPayOut":
            content_len = int(self.headers.get('content-length', 0))
            body = self.rfile.read(content_len)
            contract_data = json.loads(body)
            self.send_response(200)
            self.main.pay_out_executed_contract(self.main.get_executed_contract_from_contract_id(contract_data["ex_contract_id"]))
        elif self.path == "/UsersChange":
            content_len = int(self.headers.get('content-length', 0))
            body = self.rfile.read(content_len)
            user_data = json.loads(body)
            self.send_response(200)

            # print(user_data["what_to_change"])
            self.main.change_user(
                    user_data["user_id"], user_data["what_to_change"], user_data["new_value"]
                )
        elif self.path == "/ProductsChange":
            content_len = int(self.headers.get('content-length', 0))
            body = self.rfile.read(content_len)
            product_data = json.loads(body)
            self.send_response(200)
            self.main.change_product(
                    product_data["product_id"], product_data["what_to_change"], product_data["new_value"]
                )
        elif self.path == "/LevelsChange":
            content_len = int(self.headers.get('content-length', 0))
            body = self.rfile.read(content_len)
            level_data = json.loads(body)
            self.send_response(200)
            self.main.change_level(
                level_data["level_id"], level_data["what_to_change"], level_data["new_value"]
            )
        elif self.path == "/ClientsChange":
            content_len = int(self.headers.get('content-length', 0))
            body = self.rfile.read(content_len)
            client_data = json.loads(body)
            self.send_response(200)
            self.main.change_client(
                client_data["client_id"], client_data["what_to_change"], client_data["new_value"]
            )
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Credentials', 'true')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header("Access-Control-Allow-Headers", "X-Requested-With, Content-type")
        self.end_headers()



