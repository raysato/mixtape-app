export class TaskRunner {
  private intervalId: number | null = null;

  // Method to start the task
  start(task: () => void): void {
    if (this.intervalId !== null) {
      console.warn("Task is already running.");
      return;
    }

    this.intervalId = window.setInterval(() => {
      task();
    }, 50);
  }

  // Method to stop the task
  stop(): void {
    if (this.intervalId === null) {
      console.warn("Task is not running.");
      return;
    }

    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  // Check if the task is running
  isRunning(): boolean {
    return this.intervalId !== null;
  }
}
