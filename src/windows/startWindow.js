import './startWindow.css';

function StartWindow() {

  return (
    <div className='start-window'>
      <div className='slides'>
        <div className='first-slide'>
          <p className='slide-text nes-container is-dark'>
            After so much time, you return to this tavern again.
            This is an overnight stay for those in need, a bar for drinkers, a storehouse of interesting stories for listeners and writers who write about the wanderers' hikes.
            For people like you, this is a place to rest before the next outing, and find employers.
          </p>
        </div>
        <div className='second-slide'>
          <p className='slide-text nes-container is-dark'>
            Going into the inn, I see a lot of people. Is it always so noisy here, or did I get used to people during the time I was on another treasure hunt? It doesn't matter.
            I'm here for one reason - to take a break from my craft. No matter what anyone says, but ale here has always been the best.
            After a couple of mugs, I notice a dark silhouette in the distance. A strange man, I haven't seen him here before. Before he could blink, he approached my desk.
          </p>
        </div>
        <div className='third-slide'>
          <p className='slide-text nes-container is-dark'>
            I looked the stranger up and down. Despite the fact that it was quite light in the inn, I didn't see his face.
            After a couple of moments, he spoke. His voice sounded familiar, but at the same time, I didn't know him.
            He offered me an order "that cannot wait."
            I was about to refuse, however, something told me that I had to agree and go. I agreed before he told me the price.
          </p>
        </div>
        <div className='fourth-slide'>
          <p className='slide-text nes-container is-dark'>
            And here I am, whatever it is, the customer is ready to pay a tidy sum.
            This place looks creepy. But when has that ever stopped me?
          </p>
          <button className='start-button'>Start of your journey</button>
        </div>
      </div>
    </div>
  )
}
export default StartWindow;