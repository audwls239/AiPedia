import re, os, requests, json, time
from bs4 import BeautifulSoup
from datetime import datetime


# 디렉토리 지정
LOAD_DIR = "crawl_url.txt"
SAVE_DIR = "crawl_data"
os.makedirs(SAVE_DIR, exist_ok=True)


# 방문할 URL 불러오기
def load_url_list():
    try:
        with open(LOAD_DIR, "r") as f:
            return set(line.strip() for line in f if line.strip())
    except FileNotFoundError:
        print("파일이 존재하지 않습니다. 생성합니다.")
        open(LOAD_DIR, "w")

        return set()

# JSON으로 저장
def save_json(title, url: str, contents):
    now = datetime.now()
    formattedDate = now.strftime("%Y-%m-%d %H:%M:%S")

    cleaned_contents = contents
    if isinstance(contents, str):
        # 2개 이상의 개행 문자를 하나로 줄이고 양 끝의 공백/개행을 제거
        cleaned_contents = re.sub(r'\n{2,}', '\n', contents).strip()

    saveData = {
        "title": title,
        "url": url,
        "date": formattedDate,
        "contents": cleaned_contents
    }

    # http, https 제거
    https_remove = url.lstrip("https://")
    http_remove = https_remove.lstrip("http://")
    safe_url = re.sub(r'[<>:"/\\|?*]', '_', http_remove)
    safe_url = re.sub(r'\s+', ' ', safe_url).strip()

    if len(safe_url) > 100:
        safe_url = safe_url[:100]

    savePath = os.path.join(SAVE_DIR, f"{safe_url}.json")

    with open(savePath, "w", encoding="utf-8") as f:
        json.dump(saveData, f, ensure_ascii=False, indent = 2)

# 크롤링
def crawl(url):
    try:
        res = requests.get(url, timeout=5)
        res.raise_for_status()
    except requests.exceptions.RequestException as e:
        print(f"요청 실패: {e}")
        return
    
    soup = BeautifulSoup(res.text, "html.parser")

    # title 추출
    title_obj = soup.title
    title_text = title_obj.text.strip() if title_obj else "No Title"

    if title_obj:
        print("페이지 제목:", title_text)
    else:
        print("title을 찾을 수 없음")

    # contents 추출
    try:
        contents = soup.select_one("#contents")
        result = contents.text
    except:
        result = None
        print("컨텐츠를 찾을 수 없음")
    
    save_json(title_text, url, result)

# main
if __name__ == "__main__":
    start = time.time()

    list = load_url_list()

    for url in list:
        crawl(url)

    end = time.time()
    print("time:", end - start)

    print("========== Finish ==========")
