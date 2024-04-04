import React, { useEffect, useState } from 'react';
import StudentBanner from './studentBanner.jsx';

const StudentExams = () => {
    const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
    
    useEffect(() => {
        // Effect hook code here if needed
    }, []);

    return (
        <>
            <div>
                <StudentBanner/>
            </div>

            <div className="mt-10 flex justify-center">
            <div class="card ">
  <div
    class="relative bg-kindydarkblue w-[800px] sm:w-[250] group transition-all duration-700 aspect-video flex items-center justify-center"
  >
    <div
      class="transition-all flex flex-col items-center py-5 justify-start duration-300 group-hover:duration-1000 bg-white w-full h-full absolute group-hover:-translate-y-16"
    >
      <p class="text-xl sm:text-2xl font-semibold text-gray-500 font-serif">
        Dear Student 
      </p>
      <p class="px-10 text-[10px] sm:text-[12px] text-gray-700 mt-20">
      "we are thrilled to witness your passion for music blossom each day. Your dedication and enthusiasm inspire not only us but also your fellow students. Remember, music is not just about hitting the right notes; it's about expressing emotions, telling stories, and connecting with others on a profound level. Your journey at the music conservatory is an opportunity to explore the depths of your musicality, to push boundaries, and to discover new horizons. Embrace each lesson, cherish every practice session, and above all, let your love for music guide you. I believe in your talent, your potential, and your ability to make beautiful music that will touch hearts and inspire souls. Keep shining, keep playing, and never stop pursuing your dreams. The world awaits the magic only you can create through your music."
      </p>
      <p class="font-serif text-[10px] sm:text-[12px text-gray-700">
        Wishing you a fantastic day ahead!
      </p>
      <p class="font-sans text-[10px] text-gray-700 pt-5">El Kindy</p>
    </div>
    <button
      class="seal bg-rose-500 text-red-800 w-10 aspect-square rounded-full z-40 text-[10px] flex items-center justify-center font-semibold [clip-path:polygon(50%_0%,_80%_10%,_100%_35%,_100%_70%,_80%_90%,_50%_100%,_20%_90%,_0%_70%,_0%_35%,_20%_10%)] group-hover:opacity-0 transition-all duration-1000 group-hover:scale-0 group-hover:rotate-180 border-4 border-rose-900"
    >
      open
    </button>
    <div
      class="tp transition-all duration-1000 group-hover:duration-100 bg-neutral-800 absolute group-hover:[clip-path:polygon(50%_0%,_100%_0,_0_0)] w-full h-full [clip-path:polygon(50%_50%,_100%_0,_0_0)]"
    ></div>
    <div
      class="lft transition-all duration-700 absolute w-full h-full bg-neutral-900 [clip-path:polygon(50%_50%,_0_0,_0_100%)]"
    ></div>
    <div
      class="rgt transition-all duration-700 absolute w-full h-full bg-neutral-800 [clip-path:polygon(50%_50%,_100%_0,_100%_100%)]"
    ></div>
    <div
      class="btm transition-all duration-700 absolute w-full h-full bg-neutral-900 [clip-path:polygon(50%_50%,_100%_100%,_0_100%)]"
    ></div>
  </div>
</div>

            </div>
        </>
    );
}

export default StudentExams;


