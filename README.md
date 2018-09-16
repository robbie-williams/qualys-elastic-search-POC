# POC - qualys-elastic-search

### intro
Sometimes the answer to your problem isn't supported. But it should be.
That said; I'm not supporting this nor do I care or endorse your usage of this package. It is a mere proof of concept. Do with it whatever you like, but don't like.. do the wrong things. I don't know what the wrong thing looks like in this instance, maybe smashing the API with a bajillion requests. I mean if it doesn't feel good or righteous then don't do it, you know. Don't be that person.

### what is this?
This is a sample nodejs application demonstrating how to use the undocumented elastic search API for Qualys customers. 

### how do I use this?
1. npm install
2. first create a folder called auth under src/resources.
3. create a file called qualysBasicAuth.base64.txt in that folder
4. put your base64 auth string into this file
4.1 it will look like username:password== except the "username:password" part should be base64 encoded
5. node src/handler.js

## support me
I like my coffee. Go on be a champ and buy me one.
[![Buy Me a Coffee at ko-fi.com](https://az743702.vo.msecnd.net/cdn/kofi6.png?v=b)](https://ko-fi.com/A3865PO)

I wrote this whole README.md decaffinated. :'(

##### why is this code so ugly
I'm new(ish) to nodejs and this is a poc