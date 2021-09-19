import React from 'react';
import { render } from '@testing-library/react';
import Calendar from '../containers/Calendar';
import userEvent from '@testing-library/user-event';

describe("<Calendar />", () => {
  const eventsMock = [
    {
      fromHour: 10,
      toHour: 12,
      title: "Work"
    },
    {
      fromHour: 11,
      toHour: 13,
      title:"Meeting"
    },
    {
      fromHour: 14,
      toHour: 15,
      title: "Break"
    },
    {
      fromHour: 13,
      toHour: 15,
      title: "Lunch"
    },
    {
      fromHour: 9,
      toHour: 21,
      title: "OOO"
    }
  ];

  it("Renders <Calendar /> with empty events", () => {
    const { container } = render(<Calendar calendarEvents={[]} />);
    const eventElements = container.getElementsByClassName('event');
    expect(eventElements).toHaveLength(0);
  });

  it("Renders <Calendar /> with 5 events", () => {
    const { container } = render(<Calendar calendarEvents={eventsMock} />);
    const eventElements = container.getElementsByClassName('event');
    expect(eventElements).toHaveLength(5);
  });

  it("Renders <Calendar /> with 4 colliding events", () => {
    const { container } = render(<Calendar calendarEvents={eventsMock} />);
    const collidingEventElements = container.getElementsByClassName('colliding-event');
    expect(collidingEventElements).toHaveLength(4);
  });

  it("when the biggest event removed(OOO), Rerenders <Calendar /> with 2 colliding events", () => {
    const { container } = render(<Calendar calendarEvents={eventsMock} />);
    const eventElements = container.getElementsByClassName('event');
    userEvent.click(eventElements[0]);
    const collidingEventElements = container.getElementsByClassName('colliding-event');
    expect(collidingEventElements).toHaveLength(2);
  });

  it("when the biggest event removed(OOO), Lunch event removed, Rerenders <Calendar /> with 1 colliding event", () => {
    const { container } = render(<Calendar calendarEvents={eventsMock} />);
    const eventElements = container.getElementsByClassName('event');
    userEvent.click(eventElements[0]);
    userEvent.click(eventElements[3]);
    const collidingEventElements = container.getElementsByClassName('colliding-event');
    expect(collidingEventElements).toHaveLength(1);
  });

  it("when the biggest event removed(OOO), Lunch event removed, Work event removed, Rerenders <Calendar /> with 0 colliding event", () => {
    const { container } = render(<Calendar calendarEvents={eventsMock} />);
    const eventElements = container.getElementsByClassName('event');
    userEvent.click(eventElements[0]);
    userEvent.click(eventElements[3]);
    userEvent.click(eventElements[1]);
    const collidingEventElements = container.getElementsByClassName('colliding-event');
    expect(collidingEventElements).toHaveLength(0);
  });

  it("when all events removed, Rerenders <Calendar /> with 0 events", () => {
    const { container } = render(<Calendar calendarEvents={eventsMock} />);
    const eventElements = container.getElementsByClassName('event');
    userEvent.click(eventElements[0]);
    userEvent.click(eventElements[3]);
    userEvent.click(eventElements[1]);
    userEvent.click(eventElements[1]);
    userEvent.click(eventElements[0]);
    const updatedEventElements = container.getElementsByClassName('event');
    expect(updatedEventElements).toHaveLength(0);
  });
});