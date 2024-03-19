cat \
    public/store/css/reset.css \
    public/store/css/slideshow.css \
    public/store/css/style.css | \
        tr -s ' ' | tr -d '\n' > public/store/css/xxx.css
