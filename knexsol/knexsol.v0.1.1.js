$(function() {

    /***********************************************************************
    * init all bx-accordions
    ***********************************************************************/
    $('.bx-accordion').each(function() {
        var maxHt = 0;
        var imgList = $(this).find('.acc-img');
        //Find the max height from all the images
        imgList.each(function() {
            if ($(this).height() > maxHt) {
                maxHt = $(this).height();
            }
        });

        //Assign that height to each one of them
        imgList.each(function() {
            $(this).height(maxHt);
        });

        //also correct the top position of the arrow icons
        var navTop = maxHt / 2 - 20;
        navTop = (navTop < 110) ? 110 : navTop;
        $(this).find('.navigate').css('top', navTop + 'px')


        //since the navigate icons are by default hidden by css
        //unhide the right one
        $(this).find('.navigate.right').show();
    });

    //accordion navigattion arrows clicked
    $(document).on('click', '.bx-accordion .navigate', function() {
        var unitList = $(this).closest('.bx-accordion').find('.acc-unit');

        var selectedIndex;
        //var animateClass = 'visible animated bounceIn';

        unitList.each(function(index) {
            if (!selectedIndex && $(this).hasClass('visible')) {
                selectedIndex = index;
            }
        });

        // if left button clicked 
        // and selectedIndex is Greater than  0
        // minus 1 it
        if ($(this).hasClass('left') && selectedIndex > 0) {
            selectedIndex--;
            //animateClass = 'visible animated zoomIn';
        }

        // if right button clicked 
        // and selectedIndex is less than  (length-1)
        // plus 1 it
        else if ($(this).hasClass('right') && selectedIndex < (unitList.length - 1)) {
            selectedIndex++;
            //animateClass = 'visible animated zoomIn';
        }

        // Add visible to only the particular class
        //unitList.removeClass(animateClass);
        //unitList.eq(selectedIndex).addClass(animateClass);

        //hide the terminal arrows
        var bxAccordion = $(this).closest('.bx-accordion');
        bxAccordion.find('.navigate').show(); //1st show both
        if (selectedIndex === 0) {
            bxAccordion.find('.navigate.left').hide();
        } else if (selectedIndex === (unitList.length - 1)) {
            bxAccordion.find('.navigate.right').hide();
        }
    });

    //////////////// END OF bx-accordion ///////////////////////////////////




    
});