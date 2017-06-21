# Sahibinden-Bot
NodeJS kullanılarak oluşturulmuş basit bir sahibinden bot uygulaması

# Kurulum
Projenin kurulu olduğu dizin içerisinde aşağıdaki komut çalıştırılır. Bu komutun çalışması için bilgisayar üzerinde npm kurulu olmalıdır.

> npm install

Örnek Kullanımlar:

- > http://localhost:portNo/getSinglePageResult/fiat -> Fiat sorgusuna ait kayıtlardan ilk 20 sini json formatında döndürür.
- > http://localhost:portNo/getRangeResult/fiat?begin=1&end=3 -> Fiat sorgusuna ait kayıtlardan 1. ve 3. sayfalar arasındaki kayıtları json formatında döndürür.
- > http://localhost:portNo/getSubCategories/bilgisayar -> Girilen ana kategorinin alt kategorilerini JSON formatında döndürür.
- > http://localhost:portNo/getBrandSubCategories/volvo -> Girilen alt kategorinin alt kategorilerinin etiketlerini ve kaçar adet olduklarını JSON formatında döndürür. (s40-560,s60-1.246 vb. gibi)



