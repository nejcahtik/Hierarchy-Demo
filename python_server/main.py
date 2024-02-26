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
from MyServer import MyServer
from Controller import Controller


controller = Controller()


hostName = "localhost"
serverPort = 8080

controller = Controller()





#######################################################################################################################################
#######################################################################################################################################
#######################################################################################################################################
#######################################################################################################################################
#######################################################################################################################################


#######################################################################################################################################
#######################################################################################################################################
#######################################################################################################################################
#######################################################################################################################################


def run_server():
    if __name__ == "__main__":
        webServer = HTTPServer((hostName, serverPort), MyServer)
        print("Server started http://%s:%s" % (hostName, serverPort))

        try:
            webServer.serve_forever()
        except KeyboardInterrupt:
            pass

        webServer.server_close()
        print("Server stopped.")


print("MyApp version 5.0. Enter 'help' for available commands")

while True:

    in_put = str(input("MyApp running >> "))

    if in_put == "add_manager":
        name_of_user = str(input("NAME OF THE MANAGER: "))
        surname_of_user = str(input("SURNAME OF THE MANAGER: "))
        personal_points = float(input("STARTING AMOUNT OF PERSONAL POINTS (float): "))
        networking_points = float(input("STARTING AMOUNT OF NETWORKING POINTS (float): "))
        cash = float(input("STARTING AMOUNT OF CASH (float): "))
        emso_of_user = int(input("EMSO OF THE MANAGER: "))
        municipality_of_user = str(input("MUNICIPALITY OF THE MANAGER: "))
        geolocation_of_user = str(input("GEOLOCATION OF THE MANAGER: "))
        trr_of_user = str(input("TRR OF THE MANAGER: "))
        bank_of_user = str(input("BANK OF THE MANAGER: "))
        employment_contract_date_of_user = str(
            input("EMPLOYMENT CONTRACT DATE OF user (in format: 'YYYY-MM-DD'): "))
        mentorship_date = str(input("MENTORSHIP DATE: "))

        controller().add_manager(name_of_user, surname_of_user, personal_points, networking_points, personal_points+networking_points, cash, cash,
                    emso_of_user, municipality_of_user, geolocation_of_user,
                    trr_of_user, bank_of_user, employment_contract_date_of_user, mentorship_date)
    elif in_put == "add_user":
        name_of_user = str(input("NAME OF user: "))
        surname_of_user = str(input("SURNAME OF user: "))
        mentor_name_of_user = str(input("NAME OF THE MENTOR: "))
        mentor_surname_of_user = str(input("SURNAME OF THE MENTOR: "))
        personal_points = float(input("STARTING AMOUNT OF PERSONAL POINTS (float): "))
        networking_points = float(input("STARTING AMOUNT OF NETWORKING POINTS (float): "))
        cash = float(input("STARTING AMOUNT OF CASH (float): "))
        level_number = int(input("STARTING LEVEL (integer): "))
        emso_of_user = int(input("EMSO OF user: "))
        municipality_of_user = str(input("MUNICIPALITY OF user: "))
        geolocation_of_user = str(input("GEOLOCATION OF user: "))
        trr_of_user = str(input("TRR OF user: "))
        bank_of_user = str(input("BANK OF user: "))
        employment_contract_date_of_user = str(
            input("EMPLOYMENT CONTRACT DATE OF user (in format: 'YYYY-MM-DD'): "))

        mentor = controller().find_user_from_name(mentor_name_of_user, mentor_surname_of_user)


        controller.add_user(name_of_user, surname_of_user, mentor, personal_points, networking_points, networking_points+personal_points, cash, cash, emso_of_user,
                     municipality_of_user, geolocation_of_user, trr_of_user, bank_of_user,
                     employment_contract_date_of_user, "2020-1-1")
    elif in_put == "add_product":
        name = str(input("NAME OF PRODUCT (string): "))
        partner = str(input("PARTNER OF PRODUCT (string): "))
        constant = float(input("CONSTANT OF PRODUCT (float): "))
        plan_value = str(input("PLAN VALUE OF PRODUCT (float): "))
        basic_name = str(input("BASIC NAME OF PRODUCT (string): "))
        plan_type = str(input("PLAN TYPE OF PRODUCT (string): "))
        product_type = str(input("PRODUCT TYPE (string): "))
        plan_name = str(input("PLAN NAME (string): "))
        bcv = float(input("BASIC CALCULATION VARIABLE (float): "))
        points_earned = float(input("POINTS EARNED (float): "))
        points_to_be_paid = str(input("POINTS TO BE PAID (yes/no): "))
        points_for_career = str(input("POINTS TO BE CALCULATED FOR CAREER (yes/no): "))
        satbppr = str(input("SALES AMOUNT TO BE PRESENTED IN PAYOUT REPORT (yes/no): "))

        controller.add_product(name, partner, constant, plan_value, basic_name, plan_type,
                    product_type, plan_name, bcv, points_earned, points_to_be_paid,
                    points_for_career, satbppr)

    elif in_put == "add_contract":
        product_name = str(input("PRODUCT NAME (string): "))
        user_name = str(input("user NAME (string): "))
        user_surname = str(input("user SURNAME (string): "))
        client_name = str(input("CLIENT NAME (string): "))
        client_surname = str(input("CLIENT SURNAME (string): "))
        date_of_payment = str(input("DATE OF PAYMENT (format: YYYY-MM-DD): "))
        base_value = float(input("BASE VALUE (float): "))

        user = controller.find_user_from_name(user_name, user_surname)
        client = controller.find_client(client_name, client_surname)
        product = controller.find_product(product_name)

        controller.add_contract(product.id, user.id, client.id, date_of_payment, base_value)
    elif in_put == "add_client":
        name = str(input("CLIENT NAME (string): "))
        surname = str(input("CLIENT SURNAME (string): "))
        emso = int(input("CLIENT EMSO (integer): "))
        address = str(input("CLIENT ADDRESS (string): "))
        city =  str(input("CLIENT CITY (string): "))
        email = str(input("CLIENT EMAIL (string): "))

        controller.add_client(name, surname, emso, address, city, email)
    elif in_put == "add_level":
        level = int(input("LEVEL OF HIERARCHY (integer): "))
        name = str(input("LEVEL NAME (string): "))
        points_from = float(input("POINTS FROM (float): "))
        points_to = float(input("POINTS TO (float): "))
        in_eur = float(input("VALUE IN EUR (float): "))

        controller.add_level(level, name, points_from, points_to, in_eur)
    elif in_put == "change_user":
        user_name = str(input("NAME OF user YOU WANT TO CHANGE (string): "))
        user_surname = str(input("SURNAME OF user YOU WANT TO CHANGE (string): "))
        what_to_change = str(input(
            "WHAT DO YOU WANT TO CHANGE (available options: name, surname, mentor, date_of_mentorship, emso, geolocation, "
            "TRR, bank, employment_contract_date): "))

        user = controller.find_user_from_name(user_name, user_surname)

        # todo
        new_value1 = input("ENTER NEW VALUE: ")

        if what_to_change == "mentor":
            new_value2 = input("ENTER NEW VALUE2")
            controller.change_user(user.id, what_to_change, new_value1)
        else:
            controller.change_user(user.id, what_to_change, new_value1)

    elif in_put == "change_product":
        product_name = str(input("ENTER PRODUCT NAME YOU WANT TO CHANGE (string): "))

        what_to_change = str(input(
            "WHAT DO YOU WANT TO CHANGE (options: name, product_partner, constant, plan_value, basic_name, plan_type): "))

        product = controller.find_product(product_name)
        # todo
        new_value = input("ENTER NEW VALUE: ")

        controller.change_product(product.id, what_to_change, new_value)

    elif in_put == "change_contract":
        controller.change_contract()
    elif in_put == "change_executed_contract":
        controller.change_executed_contract()
    elif in_put == "change_level":
        level_number = int(input("ENTER LEVEL NUMBER YOU WANT TO CHANGE (integer): "))
        what_to_change = str(input(
            "WHAT DO YOU WANT TO CHANGE (options: level_number, level_name, points_from, points_to, value_in_eur): "))

        level = controller.get_level_from_level_number(level_number)
        # todo
        new_value = input("ENTER NEW VALUE: ")

        controller.change_level(level.level_id, what_to_change, new_value)
    elif in_put == "change_client":
        name = str(input("ENTER CLIENT NAME YOU WANT TO CHANGE: "))
        surname = str(input("ENTER CLIENT SURNAME YOU WANT TO CHANGE: "))
        what_to_change = str(input("WHAT DO YOU WANT TO CHANGE (options: name, surname, emso): "))

        client = controller.find_client(name, surname)
        # todo
        new_value = input("ENTER NEW VALUE: ")

        controller.change_client(client.id, what_to_change, new_value)
    elif in_put == "show_contracts":
        date_from = str(input("ENTER DATE FROM (YYYY-MM-DD): "))
        date_to = str(input("ENTER DATE TO (YYYY-MM-DD): "))
        controller.show_contracts(date_from, date_to)
    elif in_put == "show_levels":
        controller.show_levels()
    elif in_put == "show_users":
        controller.show_users()
    elif in_put == "show_products":
        controller.show_products()
    elif in_put == "show_clients":
        controller.show_clients()
    elif in_put == "show_executed_contracts":
        date_from = str(input("ENTER DATE FROM (YYYY-MM-DD): "))
        date_to = str(input("ENTER DATE TO (YYYY-MM-DD): "))
        controller.show_executed_contracts(date_from, date_to)
    elif in_put == "exit":
        break
    elif in_put == "add_from_table":
        controller.add_from_table()
    elif in_put == "update_levels_of_users":
        controller.update_levels_of_users()

    elif in_put == "pay_out_contracts":
        name = str(input("WHICH user'S CONTRACTS YOU WOULD LIKE TO PAY OUT, NAME: "))
        surname = str(input("WHICH user'S CONTRACTS YOU WOULD LIKE TO PAY OUT, SURNAME: "))
        date_from = str(input("PAY OUT CONTRACTS FROM (YYYY-MM-DD): "))
        date_to = str(input("PAY OUT CONTRACTS TO (YYYY-MM-DD): "))
        controller.pay_out_contracts(controller.find_user_from_name(name, surname), date_from, date_to)

    elif in_put == "pay_out_executed_contracts":
        name = str(input("WHICH user'S EXECUTED CONTRACTS YOU WOULD LIKE TO PAY OUT, NAME: "))
        surname = str(input("WHICH user'S EXECUTED CONTRACTS YOU WOULD LIKE TO PAY OUT, SURNAME: "))
        date_from = str(input("PAY OUT EXECUTED CONTRACTS FROM (YYYY-MM-DD): "))
        date_to = str(input("PAY OUT EXECUTED CONTRACTS TO (YYYY-MM-DD): "))
        controller.pay_out_executed_contracts(controller.find_user_from_name(name, surname), date_from, date_to)

    elif in_put == "show_contracts_of":
        name = str(input("CONTRACTS OF WHICH user WOULD YOU LIKE TO SEE, NAME (string): "))
        surname = str(input("CONTRACTS OF WHICH user WOULD YOU LIKE TO SEE, SURNAME (string): "))
        date_from = str(input("DATE FROM (YYYY-MM-DD): "))
        date_to = str(input("DATE TO: (YYYY-MM-DD): "))

        user = controller.find_user_from_name(name, surname)
        controller.show_contracts_of(user, date_from, date_to)

    elif in_put == "show_executed_contracts_of":
        name = str(input("EXECUTED CONTRACTS OF WHICH user WOULD YOU LIKE TO SEE, NAME (string): "))
        surname = str(input("EXECUTED CONTRACTS OF WHICH user WOULD YOU LIKE TO SEE, SURNAME (string): "))
        date_from = str(input("DATE FROM (YYYY-MM-DD): "))
        date_to = str(input("DATE TO: (YYYY-MM-DD): "))

        user = controller.find_user_from_name(name, surname)
        controller.show_executed_contracts_of(user, date_from, date_to)
    elif in_put == "run_server":
        run_server()
    elif in_put == "get_manager":

        manager = controller.get_manager()
        print(manager.name)


    elif in_put == "help":
        print("Currently supported commands (23):\n 'add_manager',\n 'add_user',\n 'add_product',\n 'add_contract',\n'add_client',\n 'add_level',\n 'change_user',\n"
              "  'change_product',\n 'change_contract',\n 'show_contracts',\n 'change_executed_contract',\n 'change_level',\n 'change_client',\n 'show_levels',\n 'show_users',"
              "\n'show_products',\n 'show_clients',\n 'show_executed_contracts',\n 'pay_out_contracts',\n 'pay_out_executed_contracts',\n 'add_from_table',\n 'update_levels_of_users',\n"
              " 'run_server', \n 'exit'")

    else:
        print("No such command. Enter 'help' to print available commands.")