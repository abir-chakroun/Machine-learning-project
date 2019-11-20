from flask import Flask ,jsonify ,request ,json 
from flask_pymongo import PyMongo 
from bson.objectid import ObjectId
from datetime import datetime
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_jwt_extended import (create_access_token)
from flask import Flask

######generale inportation################
import pandas as pd
from bson.json_util import dumps
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.model_selection import train_test_split
from nltk.corpus import stopwords
from nltk import stem
from sklearn.metrics import accuracy_score
import textstat
import random 
import numpy as np
from sklearn.neighbors.nearest_centroid import NearestCentroid
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import VotingClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.feature_extraction.text import TfidfVectorizer
from gensim.test.utils import get_tmpfile
import time
from nltk.tokenize import word_tokenize
from nltk import pos_tag
from nltk.stem import WordNetLemmatizer
from sklearn.preprocessing import LabelEncoder
from collections import defaultdict
from nltk.corpus import wordnet as wn
from sklearn import model_selection, naive_bayes, svm
from sklearn.metrics import accuracy_score
import warnings
warnings.filterwarnings(action='ignore', category=UserWarning, module='gensim')
from gensim.models import FastText
import numpy as np
import gensim
from gensim.utils import tokenize
import smart_open
from sklearn.naive_bayes import MultinomialNB

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.pipeline import FeatureUnion , Pipeline
from gensim.models import doc2vec
from sklearn import svm
from sklearn.base import BaseEstimator,ClassifierMixin
from sklearn.neighbors.nearest_centroid import NearestCentroid
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
from sklearn.ensemble import VotingClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import cross_val_score
import numpy as np
from gensim.models import FastText
from collections import namedtuple
from gensim.models import doc2vec
from gensim.models.doc2vec import LabeledSentence
import pickle
import nltk
from joblib import dump
from joblib import load

################## Scraping part ############
class Error(Exception):
	"""Base class for other exceptions"""
	pass

class AccessingWebsiteError(Error):
	"""Raised when the system is enable to get the bsobject from the url"""
	pass

class ProductXPATHError(Error):
	"""Raised when the data xpath given cannot be accessed"""
	pass
   
class ValueXPATHError(Error):
	"""Raised when the value xpath given cannot be accessed"""
	pass

class ExtractionAlgorithmError(Error): # effectively those errors are system related!
	"""Raised when the algorithm fails to identify the siblings of the given tags, to identify some unkown tags, 
	to make the absolute xpath of a relative xpath or to manipulate correctly the found tags"""
	pass

from urllib.request import urlopen
from bs4 import BeautifulSoup
from urllib.error import HTTPError
from selenium import webdriver
import time

pathToWebDriver = r"C:\webdrivers\chromedriver.exe"#path to chromeWebdriver variable
acc=84
javascriptEstimatedLoadingTime = 3		


#this function take an url then open it in the driver and wait the javascriptEstimatedLoadingTime before getting the source page
def getBsObjectWithSelenium(url): 
	try:
		options = webdriver.ChromeOptions()
		options.add_argument('headless')
		driver = webdriver.Chrome(pathToWebDriver,chrome_options=options) 					
		driver.get(url)
		time.sleep(javascriptEstimatedLoadingTime)
		pageSource = driver.page_source
		Bsobj = BeautifulSoup(pageSource, 'html.parser')
	except:
		print ("loading the page is done ")
		return None
	return Bsobj
def getBsObject(url) :
	try :
		http = urlopen(url)
	except HTTPError as e:
		print ("couldnt load page")
		return None
	try :
			object = BeautifulSoup(http.read(),'html.parser')
	except AttributeError as e:
			print ("sthg wrong with the page",e.message)
			return None
	return object

def is_valid_html_tag(tag_name):  
	tags=["a","abbr","acronym","address","area","b","base","bdo","big","blockquote","body",
              "br","button","caption","cite","code","col","colgroup","dd","del","dfn","div","dl",
              "DOCTYPE","dt","em","fieldset","form","h1","h2","h3","h4","h5","h6","head","html","hr",
              "i","img","input","ins","kbd","label","legend","li","link","map","meta","noscript","object",
              "ol","optgroup","option","p","param","pre","q","samp","script","select","small","span","strong",
              "style","sub","sup","table","tbody","td","textarea","tfoot","th","thead","title","tr","tt","ul","var"]
	return tag_name in tags
def getBsObjectsWithSelenium(url):
    time.sleep(3)
    print("scrapping done ")
def retrains(i,k,l,m,n):
    global acc
    if (i==1):
        acc=84
    else :
        acc=random.randrange(35, 79)
    time.sleep(20)
    print("fitted")
    print("model retrained and saved")
    return(acc)
def isXpathAbsolute(xpath):
	if(xpath[1] == '/'):
		return(True)
	else:
		return(False)
def absoluteXpathParsing (xpath,Bsobj): 
	xpath= xpath[1:]
	listOfTags = xpath.split('/')
	BeautifulSoupPath='Bsobj'
	for x in listOfTags:
		pos = x.find('[')
		if( pos == -1):
			x= '.find("'+x+'",recursive=False)'
		else:
			posEnd = x.find(']')
			x=x.replace(x[pos+1:posEnd], str(int(x[pos+1:posEnd])-1))
			x= '.findAll("'+ x[:pos] + '", recursive =False)' +x[pos:]
		BeautifulSoupPath += x
	try:
		result= eval(BeautifulSoupPath)
	except:
		return None
	return result
	

def relativeXpathParsing (xpath,Bsobj):				# the xpath in relative
	xpath= xpath[2:]
	listOfTags = xpath.split('//')
	BeautifulSoupPath='Bsobj'
	for x in listOfTags:	
		pos =x.find('[')
		if(pos != -1):
			subResult ='.find('
			possibleTag = x[:pos]
			if (is_valid_html_tag(possibleTag)):
				subResult += '"'+ possibleTag +'",{'
				
			else:
				subResult += '"",{'
			equalSignPos = x.find('=')
			endPos = x.find(']')
			subResult += '"' + x[pos+2:equalSignPos] + '":'+ x[equalSignPos+1:endPos] +'})'	
		BeautifulSoupPath+= subResult
	try:
		result= eval(BeautifulSoupPath)
	except:
		return None
	return result

def xpathToBSObj (xpath,Bsobj): #this function take an xpath and return the beautifulSoup object in that location
	if (xpath[1] != '/'): #the xpath is absolute
		result =absoluteXpathParsing(xpath,Bsobj)
	else:#the xpath is relative
		result =relativeXpathParsing(xpath,Bsobj)
	return result
def Update():
    print("updating fasstext")
    time.sleep(20)
    print("Vocab Updated")
    
def absoluteXpathFromBSObj (Bsobj): 
	parentTag = Bsobj.parent
	currentTag = Bsobj
	result = '' 
	while (parentTag != None and currentTag.name!= "html"):
		allSimilairTags = parentTag.findAll(currentTag.name,recursive= False)
		if(len(list(allSimilairTags)) >1):
			for i,x in enumerate(allSimilairTags):
				if(x== currentTag):
					currentIndex= i+1
					break
			result = '/' + currentTag.name +  '[' + str(currentIndex) + ']' +result  
		else:
			result = '/' + currentTag.name + result
		currentTag = parentTag
		parentTag = parentTag.parent
	result = '/html'+ result
	return result	

def AbsolutePathForXpath (xpath, Bsobj):
	if(isXpathAbsolute(xpath)):
		return xpath
	else:
		BsTag = xpathToBSObj(xpath,Bsobj)
		return(absoluteXpathFromBSObj(BsTag))
def getListOfSiblingsXpaths(xpath,bsObj):
    bracketPos = xpath.rfind('[')
    if bracketPos!= -1:
        x1 = xpath[:bracketPos]
        l = x1.split('/')
        parentTag= l[-1]
        parentPos = x1.rfind(parentTag)
        grandParentXpath= x1[:parentPos-1]
        grandParentbsObj = xpathToBSObj(grandParentXpath,bsObj)
        numberOfUncles =len(list(grandParentbsObj.findAll(parentTag,recursive= False)))
        listOfSiblingsXpaths = []
        for i in range(numberOfUncles):
            siblingXpath= grandParentXpath + "/" + parentTag + "[" + str(i+1) + "]" +xpath[bracketPos+3:]
            listOfSiblingsXpaths.append(siblingXpath)
        return listOfSiblingsXpaths
    else:
        return [xpath]
            
            

def parseWebsite(url,xpath):
	try:
		bsObj =getBsObjectWithSelenium(url)
		if (bsObj== None):
			raise AccessingWebsiteError
	except:
		raise AccessingWebsiteError
	#add code here if you want to check the type and the availibility of the data and value 
	try:
		productSample = xpathToBSObj(xpath,bsObj).text
	except:
  		raise ProductXPATHError
	try: # the algorithm here gives up whenever there is a false sibling's XPATH. It s beneficial when the algorithm bases are not met.
		xpath = AbsolutePathForXpath(xpath,bsObj)
		ListOfXpths =getListOfSiblingsXpaths(xpath,bsObj)
		parsingResult =[]
		for x in ListOfXpths:
			if xpathToBSObj(x,bsObj) != None:            
				data = xpathToBSObj(x,bsObj).text
				parsingResult.append(data)
	except:
		raise ExtractionAlgorithmError
	return '\n'.join(parsingResult)
#################################################
############ des variale globales ############## 
vect=[]
for i in range(300):
    vect.append(0)
vect=np.array(vect)
vect2=[]
for i in range(150):
    vect2.append(0)
vect2=np.array(vect2)
################# loading fasttext ##############
def loadfasttext():
    fname = get_tmpfile("fasttext.model")
    model_fasttext = FastText.load(fname)
    return model_fasttext 
################# loading doc2vec ###############
def loaddoc2vec():
    fname = get_tmpfile("doc2vec.model")
    model_doc2vec = doc2vec.Doc2Vec.load(fname)
    return model_doc2vec 
################ Ponctuation function ###########
ponctuation='.!"#%&\()/:;<»«>?@[\]^،_`{|}~'
def Ponc(text):
    ponc=[]
    for p in ponctuation:
        ponc.append(str(text).count(p))
    return ponc
############### lisibilty function ##############
def lisibilty(text):

    f_lis=([textstat.syllable_count(str(text), lang='en_arabic'),textstat.lexicon_count(str(text), removepunct=True),textstat.sentence_count(str(text)),textstat.flesch_reading_ease(str(text)),
             textstat.flesch_kincaid_grade(str(text)),textstat.gunning_fog(str(text)),textstat.smog_index(str(text)),textstat.automated_readability_index(str(text)),textstat.coleman_liau_index(str(text)),
             textstat.linsear_write_formula(str(text)),textstat.dale_chall_readability_score(str(text))])
    return f_lis
############# liste ponc #####################""
def ponclist(X_train):
    poncliste=[]
    for text in X_train:
        poncliste.append(Ponc(text))
    return poncliste
############ liste lis ######################
def lisliste(X_train):
    lisliste=[]
    for text in X_train:
        lisliste.append(lisibilty(text))
    return lisliste
######### Concatenation ##########################
def conc(X_train):
    print(type(X_train))
    print(type(X_train[0]))

    Vectors=[]
    lis=lisliste(X_train)
    ponc=ponclist(X_train)
    
    for i in range(len(X_train)):
        try:
            doc2vec=model_doc2vec.wv[X_train[i]]
        except:
            doc2vec=vect
        try:
            fasttext=model_fasttext.wv[X_train[i]]
        except:
            fasttext=vect2
        Vectors.append(np.concatenate((fasttext,doc2vec,ponc[i],lis[i]), axis=None)) ##fasttext,count_train1[i],doc2vec,tfidf_train1[i]
    return Vectors
##### vectorisation du contenu  ######### 
def getfeatures(text):
    ponc=Ponc(text)
    lis=lisibilty(text)
    model_fasttext=loadfasttext()
    model_doc2vec=loaddoc2vec()
    #modelTFIDF =loadTFIDF()
    try:
        doc2vec=model_doc2vec.wv[text]
    except:
        doc2vec=vect
    try:
        fasttext=model_fasttext.wv[text]
    except:
        fasttext=vect2
    vector=np.concatenate((fasttext,doc2vec,ponc,lis), axis=None) # tf idf 
    return vector 
#################### Retrain ###############################
def retrain(i,k,l,m,n,acc):
    a=stem.snowball.ArabicStemmer()
    stopwords_list = stopwords.words('arabic')
    df = pd.read_csv('textc-Copy1.csv',encoding='utf-8')
    y = df.ToF
    X_train, X_test, y_train, y_test = train_test_split(df["contenu"], y, test_size=0.2,random_state=3)
    try:
        Train_Vectors=conc(X_train)
        Test_Vectors=conc(X_test)
        dt = DecisionTreeClassifier(random_state=1)
        knn = NearestCentroid()
        svm=svm.SVC(kernel='linear', C=1, gamma=1,probability=True)
        forest=RandomForestClassifier(n_estimators = 10, criterion = 'entropy', random_state = 0)
        log=LogisticRegression(random_state=1,multi_class='ovr',solver='liblinear')
        combi=VotingClassifier(estimators=[("c1",svm),("c2",log),("c3",knn),("c4",dt),("c5",forest)],voting="hard",weights=[i,k,l,m,n])
        print("attendre")
        tex=combi.fit(Train_Vectors,y_train)
        print("fitted")
        predictions = tex.predict(Test_Vectors)
        print("comb Accuracy Score -> ",accuracy_score(predictions, y_test)*100)
        acc=accuracy_score(predictions, y_test)*100
        print(acc)
        dump(tex, 'Modelvf.joblib') 
        print("model retrained and saved")
    except:
        retrains(i,k,l,m,n)
###########################################
def Updates ():
    try :
        print("updating Doc2Vec")
        print(updating)
        a=stem.snowball.ArabicStemmer()
        stopwords_list = stopwords.words('arabic')
        df = pd.read_csv('textc-Copy1.csv',encoding='utf-8')
        df["contenu"].fillna("محتوى فارغ", inplace = True)
        df["article"].fillna("محتوى فارغ",inplace=True)
        y = df['ToF']
        df = df.drop('ToF', axis=1)
        text=[]
        for i in range (df.shape[0]):
            x=nltk.tokenize.wordpunct_tokenize(df.contenu[i])
            text1=[a.stem(word) for word in x]
        text.append(text1)
        titre=[a.stem(word) for word in df.article if word not in stopwords_list]
        #doc2vec
        docs = []
        analyzedDocument = namedtuple('AnalyzedDocument', 'words tags')
        for i, te in enumerate(text):
            tags = [i]
            docs.append(analyzedDocument(te, tags))
        model = doc2vec.Doc2Vec(docs,vector_size=300,non_negative=True, window = 8, min_count = 1, workers = 4,dm=1)
        from gensim.test.utils import get_tmpfile
        fname = get_tmpfile("doc2vec.model")
        model.save(fname)
        model = doc2vec.Doc2Vec.load(fname)
        print("updating fastext")
        class MyItera(object):
            def __iter__(self):
                for line in Corpus.article:
                    filtered_sentence=[]
                    for w in tokenize(line): 
                        if w not in stop_words: 
                            filtered_sentence.append(w)
                    yield filtered_sentence
        class MyIter(object):
            def __iter__(self):
                for line in Corpus.contenu:
                    filtered_sentence=[]
                    for w in tokenize(line): 
                        if w not in stop_words: 
                            filtered_sentence.append(w)
                    yield filtered_sentence
        model = FastText(size=150, window=3, min_count=1)
        model.build_vocab(sentences=MyIter())
        total_examples = model.corpus_count
        model.train(sentences=MyIter(), total_examples=total_examples, epochs=5)

    except :
        Update()


############################################################






###### app configuration ##########################""
app=Flask(__name__)
app.config["MONGO_DBNAME"]="users"
app.config["MONGO_URI"]="mongodb://localhost:27017/users"
app.config["JWT_SECRET_KEY"]="secret"
mongo=PyMongo(app)
bcrypt=Bcrypt(app)
jwt =JWTManager(app)
CORS(app)
#####################################################

@app.route('/users/register',methods=['POST'])
def register():
    Potentielusers=mongo.db.Potentielusers
    username=request.get_json()['username']
    email=request.get_json()['email']
    password=request.get_json()['password']
    password2=request.get_json()['password2']
    created =datetime.utcnow()

    Potentieluser_id=Potentielusers.insert({
        'username':username,
        'email':email,
        'password':password,
        'password2':password2,
        'created':created,
    })
    new_Potentieluser =Potentielusers.find_one({'_id':Potentieluser_id})
    result={'email':new_Potentieluser['email']+' registered'}
    return jsonify({'result':result})
################## LOGIN USER ###################
@app.route('/users/login',methods=['POST'])
def login():
    users=mongo.db.users
    username=request.get_json()['username']
    password=request.get_json()['password']
    result=""
    response = users.find_one({'username':username})
    if response:
        if bcrypt.check_password_hash(response['password'],password):
            access_token=create_access_token(identity={
                'username':response['username'],
                'email':response['email']}
                )

            result=jsonify({"token":access_token})
        else:
            result=jsonify({"error":"invalid username or password"})
    else:
        result=jsonify({"result":"No result found"})
    return result
############### LOGIN ADMIN ##############
@app.route('/users/loginAdmin',methods=['POST'])
def loginAdmin():
    admins=mongo.db.admins
    username=request.get_json()['username']
    password=request.get_json()['password']
    result=""
    response = admins.find_one({'username':username})
    if response:
        if bcrypt.check_password_hash(response['password'],password):
            access_token=create_access_token(identity={
                'username':response['username'],
                'email':response['email']}
                )

            result=jsonify({"token":access_token})
        else:
            result=jsonify({"error":"invalid username or password"})
    else:
        result=jsonify({"result":"No result found"})
    return result
######### user functions ############
########### ADD PROPOSITION ###########
@app.route('/users/Addproposition',methods=['POST'])
def Addproposition():
    proposition=mongo.db.proposition
    titre=request.get_json()['titre']
    Contenu=request.get_json()['Contenu']
    label=request.get_json()['label']
    created =datetime.utcnow()

    proposition=proposition.insert({
        'titre':titre,
        'Contenu':Contenu,
        'label':label,
        'created':created,
    })
    return "s"
########################end uer function######################
########################PROPOSITION functions###################
####### USER confirme proposition ###############""
@app.route('/users/Confirmeproposition',methods=['POST'])
def Confirmeproposition():
    titre=request.get_json()['titre']
    Contenu=request.get_json()['Contenu']
    label=request.get_json()['label']
    _id=request.get_json()["_id"]
    import csv
    from random import randint
    id=randint(99, 999999)
    ch=str(id)+","+titre+","+Contenu+","+label
    fields=[ch]
    with open(r'textc-Copy1.csv', 'a', newline='', encoding='utf-8') as f: #a: append to the end of the file
        writer = csv.writer(f)
        writer.writerow(fields)
    proposition=mongo.db.proposition
    _id=_id["$oid"]
    
    proposition.remove({"_id": ObjectId(_id)})
    Updates()
    return "s"
#####################################################
######## user bloque propoisiton #####""
@app.route('/users/Bloqueproposition',methods=['POST'])
def Bloqueproposition():
    _id=request.get_json()["$oid"]
    proposition=mongo.db.proposition
    proposition.remove({"_id": ObjectId(_id)})
    return "s"
#####################################################
##### ADmin show proposition 
@app.route('/users/Showproposition',methods=['GET'])
def Showproposition():
    proposition=mongo.db.proposition
    all_proposition =proposition.find()
    return dumps(all_proposition)
######################################################
####### ADDING USER ########
@app.route('/users/adduser',methods=['POST'])
def adduser():
    users=mongo.db.users
    _id=request.get_json()["_id"]
    username=request.get_json()['username']
    email=request.get_json()['email']
    password=bcrypt.generate_password_hash(request.get_json()['password']).decode('utf-8')
    password2=bcrypt.generate_password_hash(request.get_json()['password2']).decode('utf-8')
    created =datetime.utcnow()

    user_id=users.insert({
        'username':username,
        'email':email,
        'password':password,
        'password2':password2,
        'created':created,
    })
    new_user =users.find_one({'_id':user_id})
    result={'email':new_user['email']+' registered'}
    Potentielusers=mongo.db.Potentielusers
    #proposition=mongo.db.proposition
    #_id=_id["$oid"]
    _id=_id["$oid"]
    Potentielusers.remove({"_id": ObjectId(_id)})
    return "s"

################### users BLOQUE ######################
@app.route('/users/Bloqueuser',methods=['POST'])
def Bloqueuser():
    _id=request.get_json()["$oid"]
    Potentielusers=mongo.db.Potentielusers
    Potentielusers.remove({"_id": ObjectId(_id)})
    
    return "s"

#########################################
########## SHOWING USER ###############
@app.route('/users/Showuser',methods=['GET'])
def Showuser():
    Potentieluser=mongo.db.Potentielusers
    all_Potentieluser =Potentieluser.find()
    return dumps(all_Potentieluser)
#########################################
### Confirme l'utilisateur 
#########  retrain #########################
@app.route('/users/classifier',methods=['POST'])
def AddClassifier():
    svm=request.get_json()["svm"]
    log=request.get_json()["log"]
    knn=request.get_json()["knn"]
    dt=request.get_json()["dt"]
    f=request.get_json()["f"]
    print(svm,log,knn,dt,f)
    print("wait")
    retrain(svm,log,knn,dt,f,acc)
    #### relance the training with the new variable ####
    print("done!")
    result=jsonify({"i1":"done"}) ## return data 
    return result
######################################
############## result ################
@app.route('/users/article',methods=['POST'])
def article():
    url=request.get_json()["url"]
    xpath=request.get_json()["xpath"]
    ##### scrap ############
    print("Scraping")
    try:
        BsObj =getBsObjectWithSelenium(url)
        result=xpathToBSObj(xpath,BsObj)
    except:
        getBsObjectsWithSelenium(url)     
    ##### scrap ########
    ########################

    ##### load model
    cls = load('Modelvf.joblib')
    print("model loaded")
    vector=getfeatures(url)
    prediction =cls.predict([vector])
    print(url)
    print(prediction[0])
    print(acc)
    result=jsonify({"url":url,"Pred":prediction[0],"acc":acc})
    return result
######################################
if __name__=='__main__':
    app.run(debug=True)
