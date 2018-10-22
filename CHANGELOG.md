<a name="4.1.0"></a>
# 4.1.0 (2018-05-02)


### build

* bump versions ([4ded360](https://github.com/lacolaco/ngx/commit/4ded360))


### BREAKING CHANGES

* ngx-store now requires @lacolaco/rective-store as a peer.


<a name="4.0.1"></a>
## 4.0.1 (2018-03-30)

* update README.md

<a name="4.0.0"></a>
# 4.0.0 (2018-03-30)


### Features

* switch to [@lacolaco](https://github.com/lacolaco)/reactive-store ([75b42c1](https://github.com/lacolaco/ngx/commit/75b42c1))


### BREAKING CHANGES

* @lacolaco/store -> @lacolaco/reactive-store

Store.dispatch -> Store.patch
* **ngx-store:** `STORE_CONFIG` token is removed.
Use `STORE_MIDDLEWARE` to set middlewares instead.



<a name="3.0.0"></a>
# 3.0.0 (2018-02-01)


### Features

* **ngx-store:** support to provide injectable middlewares ([5b6e33d](https://github.com/lacolaco/ngx/commit/5b6e33d))


### BREAKING CHANGES

* **ngx-store:** `STORE_CONFIG` token is removed.
Use `STORE_MIDDLEWARE` to set middlewares instead.



<a name="2.0.1"></a>
## 2.0.1 (2018-02-01)


### Features

* **store:** support middlewares ([9eed025](https://github.com/lacolaco/ngx/commit/9eed025))



