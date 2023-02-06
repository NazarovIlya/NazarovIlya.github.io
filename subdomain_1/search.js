$(document).ready(function () {
	
    var config = {
        siteURL: 'https://nazarovilya.github.io/subdomain_1/',	// Сайт, на котором используется поиск
        searchSite: true,
        type: 'web',
        append: false,
        perPage: 8,			// Google допускает использовать максимум 8
        page: 0				// Первая страница
    }
	
    // Маленькая стрелка, которая отмечает иконку типа поиска:
    var arrow = $('<span>', { className: 'arrow' }).appendTo('ul.icons');
	
    $('ul.icons li').click(function () {
        var el = $(this);
		
        if (el.hasClass('active')) {
            // Иконка уже активна, выходим
            return false;
        }
		
        el.siblings().removeClass('active');
        el.addClass('active');
		
        // Перемещаем стрелку под данную иконку
        arrow.stop().animate({
            left: el.position().left,
            marginLeft: (el.width() / 2) - 4
        });
		
        // Устанавливаем тип поиска
        config.type = el.attr('data-searchType');
        $('#more').fadeOut();
    });
	
    // Устанавливаем домен сайта как метку для первой радио кнопки:
    $('#siteNameLabel').append(' ' + config.siteURL);
	
    // Маркируем радио кнопку поиска по сайту как активную:
    $('#searchSite').click();
	
    // Маркируем иконку веб поиска как активную:
    $('li.web').click();
	
    // Устанавливаем фокус ввода в поле для ввода текста:
    $('#s').focus();

    $('#searchForm').submit(function () {
        googleSearch();
        return false;
    });
	
    $('#searchSite,#searchWeb').change(function () {
        // Ловим событие click на одной из радио кнопок.
        // config.searchSite примет значение либо true либо false.
		
        config.searchSite = this.id == 'searchSite';
    });
    function googleSearch(settings) {
	
        // Если никаких аргументов не было передано функции,
        // то будут использоваться значения по умолчанию из объекта конфигурации:
        
        settings = $.extend({}, config, settings);
        settings.term = settings.term || $('#s').val();
        
        if (settings.searchSite) {
            // Используем  опцию для Google site:example.com для ограничения поиска
            // по определенному домену:
            settings.term = 'site:' + settings.siteURL + ' ' + settings.term;
        }
        
        // URL API Google AJAX Search
        var apiURL = 'http://ajax.googleapis.com/ajax/services/search/' + settings.type + '?v=1.0&callback=?';
        var resultsDiv = $('#resultsDiv');
        
        $.getJSON(apiURL, { q: settings.term, rsz: settings.perPage, start: settings.page * settings.perPage }, function (r) {
            
            var results = r.responseData.results;
            $('#more').remove();
            
            if (results.length) {
                
                // Если результат был возвращен, добавляем его к элементу div pageContainer,
                // который затем добавлет его к #resultsDiv:
                
                var pageContainer = $('<div>', { className: 'pageContainer' });
                
                for (var i = 0; i < results.length; i++) {
                    // Создаем новый объект результата и запускаем его метод toString:
                    pageContainer.append(new result(results[i]) + '');
                }
                
                if (!settings.append) {
                    // Данный код выполняется, если запускается новый поиск 
                    // вместо нажатия на кнопку _Показать еще_:
                    resultsDiv.empty();
                }
                
                pageContainer.append('<div class="clear"></div>')
                    .hide().appendTo(resultsDiv)
                    .fadeIn('slow');
                
                var cursor = r.responseData.cursor;
                
                // Проверяем, имеются ли еще страницы с результатами поиска, 
                // и определяем, показывать ли кнопку _Показать еще_:
                
                if (+cursor.estimatedResultCount > (settings.page + 1) * settings.perPage) {
                    $('<div>', { id: 'more' }).appendTo(resultsDiv).click(function () {
                        googleSearch({ append: true, page: settings.page + 1 });
                        $(this).fadeOut();
                    });
                }
            }
            else {
                
                // В данном поиске не было найдено ничего.
                
                resultsDiv.empty();
                $('<p>', { className: 'notFound', html: 'По вашему запросу ничего не найдено!' }).hide().appendTo(resultsDiv).fadeIn();
            }
        });
    }
});