import sys 
import pandas as pd
# Takes first name and last name via command 
# line arguments and then display them 
state_data = pd.DataFrame([1,2,3,4,5])
print("Output from Python") 
print("First name: " + sys.argv[1]) 
print("Last name: " + sys.argv[2])
state_data.to_csv('./assets/static/state_data.csv',index = False) 

# save the script as hello.py 
