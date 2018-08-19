import re
import requests
from bs4 import BeautifulSoup
import json
import collections
import telegram
from multiprocessing import Pool
from itertools import product

# 텔레그램에서 오는 메시지 시간을 어떻게 줄일까 
def telegram_notice(err_no):
	my_token = '565712291:AAHqK7gvHtQ5WKmvfAFBzKb1_sLp7Q_rL24'
	bot = telegram.Bot(token = my_token)
	updates=bot.getUpdates()
	chat_id = bot.getUpdates()[-1].message.chat.id
	
	if err_no == 1:
		text = '홈페이지 자체 오류 발생' 
	elif err_no == 2:		
		text = '홈페이지 업데이트'

	bot.sendMessage(chat_id = chat_id, text = text)


def tree():
	return collections.defaultdict(tree)

# TODO
#def update_check(old, new):



# checking final page list 

def page_check():
	# 홈화면 response 200 이 안떴을때 뜨게
	try:
		req_last_list = requests.get('http://helpline.nih.go.kr/cdchelp/disease.gst?method=listView')
		html_last_list = req_last_list.text		
		soup_last_list = BeautifulSoup(html_last_list, 'html.parser')

		link_last_lists = soup_last_list.select(
					'#page_box > li > a'
					)	

		req  = requests.get('http://helpline.nih.go.kr/cdchelp/' + str(link_last_lists[-1]['href']))    	
		html = req.text	
		soup = BeautifulSoup(html, 'html.parser')

		page = soup.select(
	  		'#page_box > li > a > span'
	  		)  	  
		last_list = page[-1].text
		
		return last_list	
	except:
		err_no = 1 
		telegram_notice(err_no)	

# get page link in list 
def get_page_link(last_list):  
	dict_link = tree()	
	page_no = 1
	list_no = 1
	

	with open('./link_list.json', 'w') as link_json:

	  while list_no <= int(last_list):
	    req_link = requests.get('http://helpline.nih.go.kr/cdchelp/disease.gst?method=listView&frm=&OMIM_ID\
	    						=&Enf=&cateCode=&searchKind=&Kof=&mediExpenses=&searchWord=&curPage='+str(list_no))
	    html_link = req_link.text
	    soup_link = BeautifulSoup(html_link, 'html.parser')
		# links 에 모든 페이지 link 들을 list 형식으로 저장 
	    links = soup_link.select('#board_tb > table > tbody > tr > td > a')

	    for link in links:
	      print(str(list_no) + '\t' + str(page_no))
	      dict_link[list_no][page_no] = link['href']
	      page_no += 1
	    list_no += 1
	  json.dump(dict_link, link_json) 	

def get_before_url():
	with open('./link_list.json') as link_json:
		link = json.load(link_json)
		
		link_no_list = []
		page_no_list = []
		
		numbers  = []
		before_url = []
		# 파일에 저장되어있는 마지막 list ,page number 받아오기
		for key, value in link.items():
			link_no_list.append(key)
			for key, value in value.items():
				page_no_list.append(key)
		x = 1
		for i in range(1, int(link_no_list[-1])+1):
			for j in range(x, x+10):
				before_url.append(link[str(i)][str(j)]) 
				# URL 에서 숫자만 추출하기 
				# number = re.findall("\d+" , before_url)[0]
				# numbers.append(number)
			x = x+10	
		return before_url

def access_page(before_url, file_name):
	with open("./diseases/{}.json".format(file_name), 'w', encoding = 'UTF8') as content_json:
		dict_content = tree()
	
		req_page = requests.get("http://helpline.nih.go.kr/cdchelp/" + before_url)
		soup_page = BeautifulSoup(req_page.content, 'html.parser')	
		print(req_page)

		names = soup_page.select(
			'#detailbd_tit > h3'
			)
		contents = soup_page.find_all(
			'div', class_='detail_list_set'
			)
		name = names[0].text.replace(names[0].text[-65:], "")

		# dictionary 만들기. 	
		for content in contents:
			name = (''.join(name.strip('\r|\n|\t')))
				location_find = name.find("/")
				
				if location_find == -1:
					pass	
				else:
					removed = (name[location_find+1:])	
			text = content.text
			subtitle = ''.join(re.findall('[A-z]+' , content.img.get("alt")))
		# TODO 정규표현식 만들기 
			dict_content['name'] = name
			dict_content[subtitle] = text
			
		json.dump(dict_content, content_json, ensure_ascii=False, indent=3)

def main():
	get_page_link(page_check())
	pool = Pool(processes=8)

	with Pool() as pool:
		disease_no = list(range(0, len(get_before_url())))
		pool.starmap(access_page, zip(get_before_url(), disease_no))
		#access_page(get_before_url()[disease_no], disease_no)

if __name__ == '__main__':
	main()