$(window).load(function()
{
    var
      AXIS_DURATION          = 1000
      ,AXIS_INITIAL_DELAY    = 2500
      ,AXIS_STAGGER_DELAY    = 50
      ,BAR_DURATION          = 1250
      ,BAR_INITIAL_DELAY     = 100
      ,BAR_OFFSET            = 1
      ,BAR_STAGGER_DELAY     = 7
      ,BAR_WIDTH             = 8
      ,CANVAS_HEIGHT         = 180
      ,CANVAS_WIDTH          = 866
      ,MARGINS               = {top:50,righ:0,bottom:20,left:40}
      ,MAX_VALUE             = 100
      ,MIN_VALUE             = 0
      ,MOVIES_PER_PAGE       = 6
      ,NUM_RATINGS           = 90
      ,ONE_SECOND_MS         = 1000
      ,UPDATE_INTERVAL_SECS  = 60
      ,TICKS                 = [MIN_VALUE,MAX_VALUE * 0.25,MAX_VALUE * 0.5,MAX_VALUE * 0.75,MAX_VALUE]
      ,curMovieIndex         = 0
      ,curMovieRowIndex      = 0
      ,movieBoxTimeline      = new TimelineMax({delay:1})
      ,$detailsTableShell    = $('#detailsTableShell')
      ,$movieBoxesShell      = $('#movieBoxesShell')
      ,axisScale             = d3.scale
                                .linear()
                                .domain([MIN_VALUE,MAX_VALUE])
                                .range([CANVAS_HEIGHT - (MARGINS.top + MARGINS.bottom),0])
      ,yScale                = d3.scale
                                .linear()
                                .domain([MIN_VALUE,MAX_VALUE])
                                .range([0,CANVAS_HEIGHT - (MARGINS.top + MARGINS.bottom)])
      ,yAxis                 = d3.svg
                                .axis()
                                .scale(axisScale).orient('left')
                                .tickSize(NUM_RATINGS * (BAR_WIDTH + BAR_OFFSET))
                                .tickPadding(10)
                                .tickValues(TICKS)

      ;


  // ===================
  // = INITIALIZE DATA =
  // ===================
  var initialize = function(movies)
  {
    $('.movieTitle').text(movies[curMovieIndex].title + ' (' + movies[curMovieIndex].releaseYear + ')');
    $('.moviePlot').text(movies[curMovieIndex].plot);
    $.each(movies,function(i,movie)
    {
      if(i < MOVIES_PER_PAGE)
      {
        var $movieBoxShell      = $('<div>').addClass('movieBoxShell')
            ,$movieBoxTextShell = $('<div>').addClass('movieBoxTextShell')
            ,$detailRow         = $('<div>').addClass('detailRow' + ((i + 1) % 2 == 0 ? ' alt' : ''))
            ,$detailRowText     = $('<div>').addClass('detailRowTextShell')
            ,ratings            = movie.ratings
            ,numRatings         = ratings.length
            ,ratingChange       = numRatings > 1 ? ratings[numRatings - 1].rating - ratings[numRatings - 2].rating : 0
        ;

        $movieBoxShell.append($('<div>').addClass('movieBox').css('background','url(' + movie.imageURL + ')').append($('<div>').addClass('movieBoxHighlight')));
        $movieBoxTextShell.append($('<p>').addClass('movieBoxTitle').text(movie.title));
        $movieBoxTextShell.append($('<p>').addClass('movieBoxScore').text(movie.ratingMeta.average));
        $movieBoxShell.append($movieBoxTextShell);
        $movieBoxesShell.append($movieBoxShell);

        $detailRowText.append($('<span>').addClass('field cell title').text(movie.title));
        $detailRowText.append($('<span>').addClass('field cell center rank').text(movie.ratingMeta.rank));
        $detailRowText.append($('<span>').addClass('field cell center current').text(movie.ratings[movie.ratings.length - 1].rating));
        $detailRowText.append($('<span>').addClass('field cell center average').text(movie.ratingMeta.average));
        $detailRowText.append($('<span>').addClass('field cell center high').text(movie.ratingMeta.high));
        $detailRowText.append($('<span>').addClass('field cell center low').text(movie.ratingMeta.low));
        $detailRowText.append($('<span>').addClass('field cell center change ' + (ratingChange > 0 ? 'positive' : ratingChange < 0 ? 'negative' : '')).text(ratingChange > 0 ? '+' + ratingChange : ratingChange));
        $detailRowText.append($('<span>').addClass('field cell center year').text(movie.releaseYear));
        $detailRow.append($detailRowText);
        $detailsTableShell.append($detailRow);
      }
    });
  };

  initialize(movies);


  // =============
  // = ANIMATION =
  // =============
  movieBoxTimeline
    .to('#loader',0.75,{scale:2,rotation:'+=35',autoAlpha:0,ease:Strong.easeIn,onComplete:function(){document.body.removeChild(document.getElementById('loader'));}})
    .staggerTo(['.fluidShell.graph','.fluidShell.movieBoxes'],1,{width:'100%',ease:Strong.easeInOut},0.1)
    .to('#logoLine',1,{top:0,autoAlpha:1,ease:Strong.easeOut},'-=0.4')
    .to('#logoShell',0.5,{left:'12px',autoAlpha:1,ease:Strong.easeOut},'-=0.6')
    .staggerTo(['.movieTitle','.moviePlot'],1,{top:0,autoAlpha:1,ease:Strong.easeOut},0.1,'-=0.15')
    .staggerTo('.movieBoxShell',0.75,{top:40,autoAlpha:1,ease:Elastic.easeOut.config(2,2)},0.075,'-=0.6')
    .staggerTo('.movieBoxTitle',1,{autoAlpha:1,ease:Strong.easeOut},0.075,'-=0.8')
    .staggerTo('.movieBoxScore',1,{autoAlpha:1,ease:Strong.easeOut},0.075,'-=1')
    .to('#movieBoxSelector',2,{top:0,ease:Strong.easeOut},'-=2')
    .to('#leftArrowShell',2.8,{left:0,autoAlpha:1,ease:Strong.easeOut},3.4)
    .to('#rightArrowShell',2.8,{right:0,autoAlpha:1,ease:Strong.easeOut},3.4)
    .staggerTo(['#detailsLabel','#detailsTableHeaderShell,#detailsTableHeaderSeparator'],0.5,{top:0,autoAlpha:1,ease:Strong.easeOut},0.1,'-=2.5')
    .staggerTo('.detailRow',1.25,{top:0,autoAlpha:1,ease:Strong.easeOut},0.05,'-=2.25',startUpdateTimer)
  ;

  movieBoxTimeline.timeScale(1.2);

  // ==========
  // = SVG =
  // ==========
  var logoCanvas        = Raphael('logoShell',110,45)
      ,logoText         = logoCanvas.path('M12.2,37.8c-0.1,2.3-0.7,4.1-1.7,5.3c-1,1.2-2.4,1.8-4.2,1.8c-2,0-3.6-0.8-4.7-2.5C0.5,40.8,0,38.1,0,34.5s0.5-6.3,1.6-7.9s2.7-2.5,4.7-2.5c1,0,1.9,0.2,2.6,0.5c0.7,0.3,1.3,0.8,1.8,1.4c0.5,0.6,0.8,1.2,1,2c0.2,0.8,0.3,1.5,0.3,2.4h-1.8c0-1.4-0.3-2.5-1-3.4c-0.7-0.9-1.6-1.3-2.9-1.3c-0.7,0-1.3,0.2-1.9,0.5c-0.6,0.3-1,0.8-1.4,1.5c-0.4,0.7-0.7,1.6-0.9,2.8c-0.2,1.1-0.3,2.5-0.3,4.2c0,1.6,0.1,3,0.3,4.2c0.2,1.1,0.5,2,0.9,2.8c0.4,0.7,0.9,1.2,1.4,1.5c0.6,0.3,1.2,0.5,1.9,0.5c1.3,0,2.3-0.5,2.9-1.5c0.7-1,1.1-2.4,1.2-4.2H12.2z M16.1,38.7h1.7v5.1c0,0.5-0.4,0.8-0.8,0.8h0c-0.5,0-0.8-0.4-0.8-0.8V38.7zM22.3,29.6h1.5v2.1h0.1c0.4-0.8,1-1.5,1.6-1.9c0.7-0.4,1.4-0.6,2.1-0.6c1.1,0,2,0.3,2.7,0.9c0.7,0.6,1,1.7,1,3.1v11.3h-1.7V33.7c0-2.1-0.8-3.1-2.5-3.1c-1,0-1.8,0.3-2.4,1c-0.6,0.7-0.9,1.6-0.9,2.8v10.1h-1.7V29.6z M44.9,39.6c-0.1,1.6-0.6,2.9-1.4,3.9c-0.8,1-1.9,1.5-3.3,1.5c-0.8,0-1.5-0.1-2.1-0.4c-0.6-0.3-1.1-0.7-1.6-1.4c-0.4-0.6-0.7-1.4-1-2.4c-0.2-1-0.3-2.2-0.3-3.6c0-2.6,0.4-4.6,1.3-5.9c0.9-1.3,2.1-1.9,3.8-1.9s2.8,0.6,3.6,1.8c0.8,1.2,1.2,3,1.2,5.5v0.6h-8v0.7c0,1.1,0.1,2,0.3,2.7c0.2,0.7,0.4,1.3,0.7,1.8c0.3,0.4,0.6,0.8,1,0.9c0.4,0.2,0.8,0.3,1.2,0.3c1.8,0,2.8-1.3,3.1-3.9H44.9z M43.3,35.8c0-1.9-0.3-3.2-0.8-3.9c-0.5-0.8-1.3-1.1-2.3-1.1c-1,0-1.8,0.4-2.3,1.1c-0.5,0.8-0.8,2.1-0.8,3.9H43.3z M57.8,30.4c0-0.4,0-0.7-0.1-1.1c-0.1-0.4-0.2-0.8-0.4-1.1c-0.2-0.3-0.4-0.6-0.7-0.8c-0.3-0.2-0.6-0.3-1-0.3c-1,0-1.7,0.5-2.1,1.6c-0.4,1.1-0.6,2.9-0.6,5.4c0,1.2,0,2.3,0.1,3.3c0.1,1,0.2,1.8,0.4,2.5c0.2,0.7,0.5,1.2,0.8,1.6c0.4,0.4,0.8,0.6,1.4,0.6c0.2,0,0.5-0.1,0.8-0.2c0.3-0.1,0.6-0.3,0.8-0.6c0.2-0.3,0.5-0.6,0.6-1c0.2-0.4,0.2-0.9,0.2-1.4v-2.1h-2.6v-3h6.5v10.9h-2.9v-1.9h-0.1c-0.5,0.8-1.1,1.4-1.7,1.7c-0.7,0.4-1.5,0.5-2.4,0.5c-1.2,0-2.2-0.2-3-0.7c-0.8-0.5-1.4-1.1-1.8-2.1c-0.4-0.9-0.7-2-0.9-3.4c-0.1-1.3-0.2-2.9-0.2-4.6c0-1.7,0.1-3.2,0.3-4.5c0.2-1.3,0.6-2.4,1.1-3.2s1.2-1.5,2.1-1.9c0.9-0.4,1.9-0.6,3.2-0.6c2.2,0,3.8,0.6,4.7,1.7c1,1.1,1.4,2.7,1.4,4.7H57.8z M65.9,29.4h3.7v2h0.1c0.4-0.7,0.9-1.3,1.4-1.8c0.6-0.4,1.2-0.7,2-0.7c0.1,0,0.2,0,0.3,0c0.1,0,0.2,0,0.3,0v3.7c-0.2,0-0.4,0-0.6,0c-0.2,0-0.4,0-0.6,0c-0.3,0-0.7,0-1,0.1c-0.3,0.1-0.6,0.3-0.9,0.5c-0.3,0.2-0.5,0.5-0.7,0.8c-0.2,0.3-0.2,0.8-0.2,1.3v9.1h-3.8V29.4z M76.8,34.1v-0.4c0-0.9,0.1-1.6,0.4-2.2c0.3-0.6,0.7-1.1,1.1-1.5c0.5-0.4,1-0.6,1.7-0.8s1.3-0.2,2-0.2c1.1,0,2,0.1,2.8,0.3c0.7,0.2,1.3,0.5,1.6,1c0.4,0.4,0.7,0.9,0.8,1.5c0.1,0.6,0.2,1.2,0.2,1.9v8c0,0.7,0,1.3,0.1,1.7c0.1,0.4,0.2,0.8,0.4,1.3h-3.7c-0.1-0.2-0.2-0.5-0.3-0.8c-0.1-0.3-0.1-0.5-0.2-0.8h-0.1c-0.4,0.8-1,1.3-1.5,1.6S80.8,45,79.9,45c-0.7,0-1.2-0.1-1.7-0.4s-0.8-0.6-1.1-1c-0.3-0.4-0.5-0.9-0.6-1.4c-0.1-0.5-0.2-1-0.2-1.5c0-0.7,0.1-1.3,0.2-1.9c0.1-0.5,0.4-1,0.7-1.3c0.3-0.4,0.7-0.7,1.2-0.9c0.5-0.2,1-0.5,1.7-0.7l2.2-0.6c0.6-0.2,1-0.4,1.2-0.6c0.2-0.3,0.3-0.7,0.3-1.2c0-0.6-0.1-1-0.4-1.4c-0.3-0.3-0.7-0.5-1.4-0.5c-0.6,0-1,0.2-1.3,0.5c-0.3,0.4-0.4,0.8-0.4,1.4v0.4H76.8zM83.8,37c-0.3,0.2-0.5,0.4-0.8,0.5c-0.3,0.1-0.6,0.2-0.8,0.3c-0.8,0.2-1.3,0.5-1.7,0.8C80.1,39,80,39.5,80,40.2c0,0.6,0.1,1.1,0.3,1.5c0.2,0.4,0.6,0.6,1.1,0.6c0.3,0,0.5,0,0.8-0.1c0.3-0.1,0.5-0.2,0.8-0.4c0.2-0.2,0.4-0.4,0.6-0.7c0.1-0.3,0.2-0.7,0.2-1.1V37z M91.5,29.4h3.7v1.6h0.1c0.5-0.7,1-1.2,1.6-1.5c0.6-0.3,1.3-0.5,2.1-0.5c0.9,0,1.6,0.2,2.2,0.6c0.6,0.4,1,1,1.2,1.8h0.1c0.3-0.8,0.8-1.4,1.4-1.8c0.7-0.4,1.4-0.6,2.3-0.6c1.3,0,2.2,0.4,2.8,1.2c0.6,0.8,0.9,1.9,0.9,3.4v11.1h-3.8V34c0-0.6-0.1-1.1-0.3-1.5c-0.2-0.3-0.6-0.5-1.2-0.5c-0.6,0-1.1,0.2-1.5,0.6c-0.4,0.4-0.5,1.1-0.5,2v10h-3.8V34c0-0.6-0.1-1.1-0.3-1.5c-0.2-0.3-0.6-0.5-1.2-0.5c-0.6,0-1.1,0.2-1.5,0.6c-0.4,0.4-0.5,1.1-0.5,2v10h-3.8V29.4z').attr({fill:'#A1B4CF',stroke:'none'})
      ,logoSaber        = logoCanvas.path('M16.9,0L16.9,0c0.5,0,0.8,0.4,0.8,0.8v35.5h-1.7V0.8C16.1,0.4,16.5,0,16.9,0z').attr({fill:'#FF2C25',stroke:'none'})
      ,logo             = logoCanvas.set(logoText,logoSaber)
      ,leftArrowCanvas  = Raphael('leftArrowShell',20,60)
      ,leftArrow        = leftArrowCanvas.path('M19.5,60c-0.2,0-0.3-0.1-0.4-0.2l-18.9-29c-0.3-0.5-0.3-1.1,0-1.6l18.9-29c0.1-0.2,0.4-0.3,0.7-0.1c0.2,0.2,0.3,0.5,0.1,0.7L1.4,29.2c-0.3,0.5-0.3,1.1,0,1.6l18.5,28.4c0.1,0.2,0.1,0.5-0.1,0.7C19.7,60,19.6,60,19.5,60z').attr({fill:'#A1B4CF',stroke:'none'})
      ,rightArrowCanvas = Raphael('rightArrowShell',20,60)
      ,rightArrow       = rightArrowCanvas.path('M0.5,60c0.2,0,0.3-0.1,0.4-0.2l18.9-29c0.3-0.5,0.3-1.1,0-1.6L0.9,0.2C0.7,0,0.4-0.1,0.2,0.1C0,0.2-0.1,0.5,0.1,0.8l18.5,28.4c0.3,0.5,0.3,1.1,0,1.6L0.1,59.2c-0.1,0.2-0.1,0.5,0.1,0.7C0.3,60,0.4,60,0.5,60z').attr({fill:'#A1B4CF',stroke:'none'})
      ;

  // =========
  // = GRAPH =
  // =========
  var graph         = d3
                        .select('#graphShell')
                        .append('svg')
                        .attr('width',CANVAS_WIDTH)
                        .attr('height',CANVAS_HEIGHT)
      ,barValueText = graph.append('text').classed('barValue',1)
      ,barAttrs     = {
                        height:function(d)
                          {
                            return yScale(d.rating);
                          }
                        ,y:function(d)
                          {
                            return CANVAS_HEIGHT - MARGINS.bottom - yScale(d.rating);
                          }
                      }
      ;

  // ==============
  // = GRAPH:AXIS =
  // ==============
  graph
    .append('g')
      .attr(
        {
          'class':'axis'
          ,transform:'translate(' + [CANVAS_WIDTH - 16,CANVAS_HEIGHT - MARGINS.bottom - MAX_VALUE - 10] + ')'
        })
      ;

  graph
    .select('.axis')
    .call(yAxis)
    .selectAll('.tick')
      .attr(
        {
          transform:function(d,i){return 'translate(' + [0,axisScale(TICKS[i]) + 40] + ')';}
        })
        .style('opacity',0)
      .transition()
      .delay(function(d,i)
        {
          return -(i  * AXIS_STAGGER_DELAY) + AXIS_INITIAL_DELAY;
        })
      .duration(AXIS_DURATION)
      .ease('elastic',2,2)
      .attr(
        {
          transform:function(d,i){return 'translate(' + [0,axisScale(TICKS[i])] + ')';}
        })
      .style('opacity',1)
    ;

  // ==============
  // = GRAPH:BARS =
  // ==============
  var valueBars = graph.selectAll('rect.valueBar')
                    .data(movies[curMovieIndex].ratings)
                    .enter()
                    .append('rect')
                    .attr(
                      {
                        'class':'valueBar'
                        ,width:BAR_WIDTH
                        ,height:0
                        ,x:function(d,i)
                          {
                            return (i * (BAR_WIDTH + BAR_OFFSET)) + MARGINS.left;
                          }
                        ,y:CANVAS_HEIGHT - MARGINS.bottom
                      })
      ,interactiveBars = graph
                          .selectAll('rect.interactive')
                          .data(movies[curMovieIndex].ratings)
                          .enter()
                          .append('rect')
                          .attr(
                            {
                              'class':'interactive'
                              ,width:BAR_WIDTH
                              ,height:CANVAS_HEIGHT - MARGINS.bottom
                              ,x:function(d,i)
                                {
                                  return (i * (BAR_WIDTH + BAR_OFFSET)) + MARGINS.left;
                                }
                            })
      ;

  valueBars
    .transition()
    .attr(barAttrs)
    .delay(function(d,i)
      {
        return (i * BAR_STAGGER_DELAY) + AXIS_INITIAL_DELAY + BAR_INITIAL_DELAY;
      })
    .duration(BAR_DURATION)
    .ease('elastic',2,2)
    .call(function(transition)
      {
        transition.each(
          'end'
          ,function(d,i)
          {
            if(i + 1 == valueBars.size())
            {
              interactiveBars.on('mouseover',function(d,i)
                {
                  var bar      = d3.select(valueBars[0][i]).classed('mouseover',1);

                  barValueText
                    .attr(
                      {
                        x:parseInt(bar.attr('x'),10) + (parseInt(bar.attr('width'),10) / 2)
                        ,y:CANVAS_HEIGHT - MARGINS.bottom - yScale(MAX_VALUE) - 10
                      })
                    .text(Math.floor(yScale.invert(d3.select(valueBars[0][i]).attr('height'))))
                    .classed('visible',1)
                    ;
                })
              .on('mouseout',function(d,i)
                {
                  d3.select(valueBars[0][i]).classed('mouseover',0);
                  barValueText.classed('visible',0);
                })
              ;
            }
          }
          
        );
      })
    ;



  // ================
  // = UPDATE TIMER =
  // ================
  function startUpdateTimer()
  {
    setTimeout(function()
    {
      d3.json('api/updates.php',function(updates)
      {
        var d = updates[curMovieIndex].ratings;

        if(!!updates)
        {
          var graph = d3
                      .select('#graphShell')
                      .selectAll('rect.valueBar')
                      .data(updates[curMovieIndex].ratings)
                      .transition()
                      .attr(barAttrs)
                      .delay(function(d,i)
                        {
                          return (i * BAR_STAGGER_DELAY) + BAR_INITIAL_DELAY;
                        })
                      .duration(BAR_DURATION)
                      .ease('elastic',2,2)
                      ;
        }
      });
      startUpdateTimer();
    },UPDATE_INTERVAL_SECS * ONE_SECOND_MS);
  };
});
