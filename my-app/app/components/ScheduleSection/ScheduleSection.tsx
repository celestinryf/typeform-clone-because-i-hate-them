"use client";

export default function TracksSection() {
  return (
    <section id="schedule" style={{ padding: '80px 20px', backgroundColor: '#d4f1f4', minHeight: '100vh' }}>
      <h2 style={{ 
        fontSize: '64px', 
        fontWeight: '700',
        marginBottom: '80px', 
        color: '#16213e',
        textAlign: 'center'
      }}>
        Schedule
      </h2>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', 
        maxWidth: '1400px', 
        margin: '0 auto', 
        gap: '60px',
        padding: '0 40px'
      }}>
        {/* Saturday */}
        <div>
          <h3 style={{ 
            fontSize: '36px', 
            fontWeight: '600',
            marginBottom: '40px', 
            color: '#16213e' 
          }}>
            Saturday, April 18th
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <ScheduleItem time="9:30AM – 11:00AM" event="Hacker Check-In" />
            <ScheduleItem time="11:00AM – 12:40PM" event="Opening Ceremony" />
            <ScheduleItem time="12:30PM – 2:30PM" event="Lunch" />
            <ScheduleItem time="1:30PM – 4:15PM" event="Workshops" />
            <ScheduleItem time="3:30PM – 5:00PM" event="Career Fair" />
            <ScheduleItem time="5:30PM – 7:00PM" event="Dinner" />
          </div>
        </div>

        {/* Sunday */}
        <div>
          <h3 style={{ 
            fontSize: '36px', 
            fontWeight: '600',
            marginBottom: '40px', 
            color: '#16213e' 
          }}>
            Sunday, April 19th
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <ScheduleItem time="9:00AM – 10:00AM" event="Breakfast" />
            <ScheduleItem time="10:30AM" event="Submissions Due!" />
            <ScheduleItem time="11:30AM – 3:00PM" event="Judging" />
            <ScheduleItem time="11:00AM – 2:30PM" event="Lunch" />
            <ScheduleItem time="3:15PM – 4:00PM" event="Closing Ceremony" />
          </div>
        </div>
      </div>
    </section>
  );
}

function ScheduleItem({ time, event }: { time: string; event: string }) {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '40px'
    }}>
      <span style={{ 
        fontSize: '30px', 
        color: '#16213e',
        fontWeight: '400',
        minWidth: '220px',
        textAlign: 'left'
      }}>
        {time}
      </span>
      <span style={{ 
        fontSize: '25px', 
        color: '#16213e',
        fontWeight: '600',
        flex: 1,
        textAlign: 'right'
      }}>
        {event}
      </span>
    </div>
  );
}